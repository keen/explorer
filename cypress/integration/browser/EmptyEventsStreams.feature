Feature: Empty event stream

  I want to check that browser view hide needless elements when I select query with empty event stream

  Background:
    Given I open a Data Explorer application

  @smoke-test
  Scenario: Needless UI elements are hidden and edit button is disabled
    When I click on query with empty event stream
    Then Share query button should not be visible
    And Query settings button should not be visible
    And Edit query button should be disabled
