Feature: Query autorun

  I want to setup query autorun

  Background:
    Given I open a Data Explorer application

  @smoke-test
  Scenario: Toggle off query autorun
    When I click on toggle
    And I reload the page
    Then Autorun settings are persisted
