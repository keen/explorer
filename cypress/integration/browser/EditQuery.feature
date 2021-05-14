Feature: Disable saved query edit

  I want to check that browser view hide needless elements when I select query with empty event stream

  Background:
    Given I open a Data Explorer application

  @smoke-test
  Scenario: User is not allowed to edit saved query
    When I select saved query that is build on a event stream that do not exist
    Then Share query button should not be visible
    And Query settings button should not be visible
    And Edit query button should be disabled
