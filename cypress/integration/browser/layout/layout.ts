import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(`I open a Data Explorer application in browser view`, () => {
  cy.visit(`${Cypress.env('host')}`);
});

Then(`I see search bar above list of saved queries`, () => {
  cy.get('[data-testid="search-queries"] input').should('exist');
});

When(`I click "New Query" button`, () => {
  cy.contains('New Query').click();
});

Then(`Query editor is presented on a screen`, () => {
  cy.get('[data-testid="editor"]').should('exist');
});

Then(`Filter queries button is presented on a screen`, () => {
  cy.get('[data-testid="filter-queries"] button').should('exist');
});
