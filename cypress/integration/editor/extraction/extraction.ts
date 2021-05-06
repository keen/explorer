import {
  Given,
  When,
  And,
  Then,
  Before,
} from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.intercept('GET', 'https://api.keen.io/3.0/projects/*?api_key=*', {
    statusCode: 200,
    fixture: 'project.json',
  }).as('project data');

  cy.intercept('GET', 'https://api.keen.io/3.0/projects/*/events/*?api_key=*', {
    statusCode: 200,
    fixture: 'schema.json',
  }).as('schema');
});

Given(`I open a Data Explorer application in editor view`, () => {
  cy.visit(`${Cypress.env('host')}`);
  cy.contains('New Query').click();
});

Given(`Select "Extraction" analysis`, () => {
  cy.contains('count').click();
  cy.contains('Extraction').click();
});

Given(`Select Event stream`, () => {
  cy.contains('Select event stream').click();
  cy.contains('event_stream').click();
});

When(`I click on "Preview Events" button`, () => {
  cy.contains('Preview Events').click();
});

Then(`Modal for "Large amount of properties" appears`, () => {
  cy.get('[data-testid="modal-container"]').should('exist');
});

And(`Close the modal`, () => {
  cy.contains('Cancel').click();
});

When(`I add more properties than limit to extract`, () => {
  for (let i = 0; i++; i <= 6) {
    cy.get('.add-button').click();
    cy.contains('active').click();
  }
});

And(`Click on "Preview Events" button`, () => {
  cy.contains('Preview Events').click();
});

Then(`Modal for "Large amount of properties" appears`, () => {
  cy.get('[data-testid="modal-container"]').should('exist');
});

And(`Close the modal`, () => {
  cy.contains('Cancel').click();
});

When(`I add less properties than limit to extract`, () => {
  cy.get('.add-button').click();
  cy.contains('active').click();
});

And(`Click on "Preview Events" button`, () => {
  cy.contains('Preview Events').click();
});

Then(`Modal for "Large amount of properties" does not appear`, () => {
  cy.get('[data-testid="modal-container"]').should('not.exist');
});
