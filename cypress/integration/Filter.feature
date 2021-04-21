Feature: Search Queries

  I want to check basic search queries functionality

  Background:
    Given I open a Data Explorer application

  @smoke-test
  Scenario: Filters button is visible
    Then Filter queries button is presented on a screen
