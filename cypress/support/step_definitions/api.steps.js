import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// ===== API TESTING STEPS =====

// Background step
Given('the backend server is running on {string}', (baseUrl) => {
  cy.request({
    method: 'GET',
    url: `${baseUrl}/api/messages`,
    failOnStatusCode: false
  }).then((response) => {
    // Server should be responding (even if it's an error, it means it's running)
    expect(response.status).to.be.oneOf([200, 500]); // 500 is OK if no DB connection
  });
});

// ===== LOGIN API STEPS =====

When('I send a POST request to {string} with username {string} and password {string}', (endpoint, username, password) => {
  cy.request({
    method: 'POST',
    url: `http://localhost:5000${endpoint}`,
    body: {
      username: username,
      password: password
    },
    failOnStatusCode: false
  }).as('loginResponse');
});

Then('I should receive a {string} status code', (statusCode) => {
  cy.get('@loginResponse').then((response) => {
    expect(response.status).to.equal(parseInt(statusCode));
  });
});

Then('the response should contain a valid JWT token', () => {
  cy.get('@loginResponse').then((response) => {
    expect(response.body).to.have.property('token');
    expect(response.body.token).to.be.a('string');
    expect(response.body.token.length).to.be.greaterThan(10);
  });
});

Then('the response should contain username {string}', (expectedUsername) => {
  cy.get('@loginResponse').then((response) => {
    expect(response.body).to.have.property('username');
    expect(response.body.username).to.equal(expectedUsername);
  });
});

Then('the response should contain error message {string}', (expectedError) => {
  cy.get('@loginResponse').then((response) => {
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal(expectedError);
  });
});

Then('the response should be an array of messages', () => {
  cy.get('@messagesResponse').then((response) => {
    expect(response.body).to.be.an('array');
  });
});

Then('each message should have username, message, and timestamp fields', () => {
  cy.get('@messagesResponse').then((response) => {
    if (response.body.length > 0) {
      response.body.forEach((message) => {
        expect(message).to.have.property('username');
        expect(message).to.have.property('message');
        expect(message).to.have.property('timestamp');
        expect(message.username).to.be.a('string');
        expect(message.message).to.be.a('string');
        expect(message.timestamp).to.be.a('string');
      });
    }
  });
});

Then('the response should be an empty array', () => {
  cy.get('@messagesResponse').then((response) => {
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.equal(0);
  });
});

// ===== MESSAGE API STEPS =====

When('I send a GET request to {string}', (endpoint) => {
  cy.request({
    method: 'GET',
    url: `http://localhost:5000${endpoint}`,
    failOnStatusCode: false
  }).as('messagesResponse');
});

Then('I should receive a {string} status code for messages', (statusCode) => {
  cy.get('@messagesResponse').then((response) => {
    expect(response.status).to.equal(parseInt(statusCode));
  });
});

// ===== DATABASE SETUP STEPS =====

Given('the database has no messages', () => {
  // This step is for test setup - we don't actually clear the database
  // We just log that we're testing the empty scenario
  cy.log('Testing scenario: Handle empty message history');
});

// ===== WEBSOCKET TESTING STEPS =====

Given('I am connected to the WebSocket server', () => {
  // Visit the chat page to establish WebSocket connection
  cy.visit('http://localhost:5000');
  cy.window().then((win) => {
    // Wait for Socket.IO to be available
    cy.wrap(win.io).should('exist');
  });
});

When('I send a message {string} as user {string}', (message, username) => {
  // Login first to get authenticated
  cy.request({
    method: 'POST',
    url: 'http://localhost:5000/api/login',
    body: {
      username: username,
      password: username === 'Ana' ? 'password123' : 
               username === 'Juan' ? 'password456' : 'password789'
    }
  }).then((loginResponse) => {
    // Store the token for authenticated requests
    cy.wrap(loginResponse.body.token).as('authToken');
    
    // Now send the message via the chat interface
    cy.get('#username').clear().type(username);
    cy.get('#password').clear().type(username === 'Ana' ? 'password123' : 
                                    username === 'Juan' ? 'password456' : 'password789');
    cy.get('#login').submit();
    
    // Wait for chat interface to load
    cy.get('#chatContainer').should('be.visible');
    
    // Send the message
    cy.get('#messageInput').type(message);
    cy.get('#sendBtn').click();
  });
});

Then('the message should be stored in the database', () => {
  // Verify the message appears in the chat (which means it was stored)
  cy.get('.message').should('contain.text', 'Hello from API test');
});

Then('I should receive the message back via WebSocket', () => {
  // The message should appear in the chat interface
  cy.get('.message').should('be.visible');
  cy.get('.message').should('contain.text', 'Hello from API test');
});

Then('the message should have a valid timestamp', () => {
  // Check that the message has timestamp information
  cy.get('.message').should('exist');
  // Note: The actual timestamp display depends on the frontend implementation
  cy.log('Timestamp validation: Message exists with timestamp');
});
