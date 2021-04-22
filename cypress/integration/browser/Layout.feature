Feature: Browser Layout

  I want to check that browser view contains all required elements

  Background:
    Given I open a Data Explorer application in browser view

  @smoke-test
  Scenario: Search bar is visible
    Then I see search bar above list of saved queries

  @smoke-test
  Scenario: Creating new query
    When I click "New Query" button
    Then Query editor is presented on a screen

  @smoke-test
  Scenario: Filters button is visible
    Then Filter queries button is presented on a screen
