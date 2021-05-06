Feature: Extraction Modal

  I want to check that extraction modal is open when collection of items is larger than limit

  Background:
    Given I open a Data Explorer application in editor view
    And Select "Extraction" analysis
    And Select Event stream

  @smoke-test
  Scenario: Shows extraction confirmation modal for full collection of properties
    When I click on "Preview Events" button
    Then Modal for "Large amount of properties" appears
    And Close the modal

  @smoke-test
  Scenario: Shows extraction confirmation modal when count of properties exceed the limit
    When I add more properties than limit to extract
    And Click on "Preview Events" button
    Then Modal for "Large amount of properties" appears
    And Close the modal

  @smoke-test
  Scenario: Do not shot show extraction confirmation modal when count of properties is below the limit
    When I add less properties than limit to extract
    And Click on "Preview Events" button
    Then Modal for "Large amount of properties" does not appear
