Feature: Extraction Modal

  I want to check that extraction modal is open when collection of items is larger than limit

  Background:
    Given I open a Data Explorer application in editor view
    And Select "Extraction" analysis
    And Select Event stream

  @smoke-test
  Scenario: Perform test for extracting a full collection of properties
    When I click on "Preview events" button
    Then Modal for "Large amount of properties" appears
    And Close the modal

  @smoke-test
  Scenario: Perform test for selecting more properties than confirmExtractionLimit
    When I add more properties than limit to extract
    And Click on "Preview events" button
    Then Modal for "Large amount of properties" appears
    And Close the modal

  @smoke-test
  Scenario: Perform test for selecting less properties than confirmExtractionLimit
    When I add less properties than limit to extract
    And Click on "Preview events" button
    Then Modal for "Large amount of properties" does not appear
