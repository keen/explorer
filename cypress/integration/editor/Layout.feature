Feature: Editor Layout

  I want to check that editor view contains all required elements

  Background:
    Given I open a Data Explorer application in editor view

  @smoke-test
  Scenario: Save query button is visible
    Then Save query button is presented on a screen

  @smoke-test
  Scenario: Run query button is visible
    Then Run query button is presented on a screen

  @smoke-test
  Scenario: Select analysis
    When I click on "Analysis" field
    And Select "Average" analysis
    Then Target property field is presented on a screen

  @smoke-test
  Scenario: Select interval
    When I click on "Interval" field
    And Select standard "Daily" interval
    Then Interval is set for query

  @smoke-test
  Scenario: Percentile field is visible
    When I click on "Analysis" field
    And Select "Percentile" analysis
    Then Percentile field is presented on a screen
    Then Target property field is presented on a screen
