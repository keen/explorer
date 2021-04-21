Feature: Creating new query

  I want to create new query from browser view

  Background:
    Given I open a Data Explorer application

  @smoke-test
  Scenario: Creating new query
    When I click "New Query" button
    Then Query editor is presented on a screen
