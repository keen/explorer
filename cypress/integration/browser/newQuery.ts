import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(`I open a Data Explorer application`, () => {
  cy.visit(`${Cypress.env('host')}`);
});

When(`I click "New Query" button`, () => {
  cy.contains('New Query').click();
});

Then(`Query editor is presented on a screen`, () => {
  cy.get('[data-testid="editor"]').should('exist');
});
