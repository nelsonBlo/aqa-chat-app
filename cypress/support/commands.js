// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom commands for chat application testing
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#login').submit();
  cy.get('#chatContainer').should('be.visible');
});

Cypress.Commands.add('sendMessage', (message) => {
  cy.get('#messageInput').type(message);
  cy.get('#sendBtn').click();
});

Cypress.Commands.add('verifyMessage', (username, message) => {
  cy.get('.message').should('contain', message);
  cy.get('.message').should('contain', username);
});

Cypress.Commands.add('verifyLoginError', () => {
  cy.get('.error').should('be.visible');
  cy.get('.error').should('contain', 'Invalid credentials');
});

Cypress.Commands.add('waitForMessage', (message) => {
  cy.get('.message').should('contain', message);
});

Cypress.Commands.add('verifyUserJoined', (username) => {
  cy.get('.messages').should('contain', `${username} joined the chat`);
});
