Feature: Filter Queries

  I want to check filter queries functionality

  Background:
    Given I open a Data Explorer application

  @smoke-test
  Scenario: Search bar is visible
    Then I see search bar above list of saved queries
