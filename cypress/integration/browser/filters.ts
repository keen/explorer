import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given(`I open a Data Explorer application`, () => {
  cy.visit(`${Cypress.env('host')}`);
});

Then(`Filter queries button is presented on a screen`, () => {
  cy.get('[data-testid="filter-queries"] button').should('exist');
});
