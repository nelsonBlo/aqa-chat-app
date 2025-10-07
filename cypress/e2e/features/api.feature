@api @backend @critical @regression
Feature: Backend API Testing
  As a backend API
  I want to handle authentication and message storage
  So that the chat application can function properly

  Background:
    Given the backend server is running on "http://localhost:5000"

  @smoke @authentication
  Scenario: Accept valid login requests
    When I send a POST request to "/api/login" with username "Ana" and password "password123"
    Then I should receive a "200" status code
    And the response should contain a valid JWT token
    And the response should contain username "Ana"

  @smoke @authentication
  Scenario: Accept valid login for user Juan
    When I send a POST request to "/api/login" with username "Juan" and password "password456"
    Then I should receive a "200" status code
    And the response should contain a valid JWT token
    And the response should contain username "Juan"

  @smoke @authentication
  Scenario: Accept valid login for user Charly
    When I send a POST request to "/api/login" with username "Charly" and password "password789"
    Then I should receive a "200" status code
    And the response should contain a valid JWT token
    And the response should contain username "Charly"

  @regression @authentication @negative
  Scenario: Reject login with incorrect username
    When I send a POST request to "/api/login" with username "invaliduser" and password "password123"
    Then I should receive a "401" status code
    And the response should contain error message "Invalid credentials"

  @regression @authentication @negative
  Scenario: Reject login with incorrect password
    When I send a POST request to "/api/login" with username "Ana" and password "wrongpassword"
    Then I should receive a "401" status code
    And the response should contain error message "Invalid credentials"

  @regression @authentication @negative
  Scenario: Reject login with empty credentials
    When I send a POST request to "/api/login" with username "" and password ""
    Then I should receive a "401" status code
    And the response should contain error message "Invalid credentials"

  @regression @authentication @negative
  Scenario: Reject login with missing username
    When I send a POST request to "/api/login" with username "Ana" and password ""
    Then I should receive a "401" status code
    And the response should contain error message "Invalid credentials"

  @regression @authentication @negative
  Scenario: Reject login with missing password
    When I send a POST request to "/api/login" with username "" and password "password123"
    Then I should receive a "401" status code
    And the response should contain error message "Invalid credentials"

  @smoke @messages @database
  Scenario: Retrieve message history from database
    When I send a GET request to "/api/messages"
    Then I should receive a "200" status code for messages
    And the response should be an array of messages
    And each message should have username, message, and timestamp fields

  @regression @messages @database
  Scenario: Handle message history retrieval
    When I send a GET request to "/api/messages"
    Then I should receive a "200" status code for messages
    And the response should be an array of messages

  @integration @messages @database
  Scenario: Store message in database via WebSocket
    Given I am connected to the WebSocket server
    When I send a message "Hello from API test" as user "Ana"
    Then the message should be stored in the database
    And I should receive the message back via WebSocket
    And the message should have a valid timestamp
