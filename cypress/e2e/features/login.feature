@regression @login @authentication
Feature: User Login
  As a user
  I want to be able to login with my credentials
  So that I can access the chat room

  Background:
    Given the chat application is running
    And I am on the login page

  @smoke @critical
  Scenario: Successful login with valid credentials
    When I enter username "Ana" and password "password123"
    And I click the login button
    Then I should be redirected to the chat room
    And I should see "Logged in as: Ana"

  Scenario: Failed login with invalid credentials
    When I enter username "invalid" and password "wrongpassword"
    And I click the login button
    Then I should see an error message "Invalid credentials"
    And I should remain on the login page

  Scenario: Failed login with empty credentials
    When I enter username "" and password ""
    And I click the login button
    Then I should see validation errors
    And I should remain on the login page

  Scenario: Login with different valid users
    When I enter username "Juan" and password "password456"
    And I click the login button
    Then I should be redirected to the chat room
    And I should see "Logged in as: Juan"

  # Scenario: Login with Charly user
  #   When I enter username "Charly" and password "password789"
  #   And I click the login button
  #   Then I should be redirected to the chat room
  #   And I should see "Logged in as: Charly"
