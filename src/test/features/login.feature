@smoke
Feature: User Authentication tests

  Background:
    Given User navigates to the application

  Scenario: Login should be success
    And User enter the username "student"
    And User enter the password "Password123"
    When User click on the login button
    Then Login should be success

  Scenario: Login should be failed
    And User enter invalid the username "InvalidUsername"
    And User enter the invalid password "InvalidPassword"
    When User click on the login button
    Then Login should be Unsuccess with text "Your username is invalid!"
