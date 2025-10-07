@regression @chat @critical
Feature: Chat Functionality
  As a logged-in user
  I want to be able to send and receive messages
  So that I can communicate with other users

  Background:
    Given the chat application is running
    And I am logged in as "Juan"

  @smoke @basic @checking
  Scenario: Send a message
    When I type "Hello everyone!" in the message input
    And I click the send button
    Then I should see my message "Hello everyone!" in the chat
    And the message should show my username "Juan"

  Scenario: Send multiple messages
    When I type "First message" in the message input
    And I click the send button
    And I type "Second message" in the message input
    And I click the send button
    Then I should see "First message" in the chat
    And I should see "Second message" in the chat

  Scenario: Send message using Enter key
    When I type "Message with Enter key" in the message input
    And I press Enter
    Then I should see "Message with Enter key" in the chat

  @regression @history
  Scenario: View message history
    Given there are existing messages in the chat
    When I login to the chat room
    Then I should see the message history
    And I should see messages from other users

  @smoke @basic
  Scenario: Send empty message
    When I click the send button without typing anything
    Then no message should be sent
    And the message input should remain empty

  @smoke
  Scenario: Test with intentional failure for evidence
    When I type "This test will fail" in the message input
    Then I should see "This message does not exist" in the chat

  Scenario: Send long message
    When I type a very long message with many characters
    And I click the send button
    Then I should see the long message in the chat
    And the message should be properly formatted
