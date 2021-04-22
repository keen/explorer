Feature: Query autorun

  I want to setup query autorun settings

  Background:
    Given I open a Data Explorer application

  @smoke-test
  Scenario: Automatically run query settings are persisted
    When I click on toggle
    And I reload the page
    Then Autorun settings are persisted
