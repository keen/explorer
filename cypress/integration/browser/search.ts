import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given(`I open a Data Explorer application`, () => {
  cy.visit(`${Cypress.env('host')}`);
});

Then(`I see search bar above list of saved queries`, () => {
  cy.get('[data-testid="search-queries"] input').should('exist');
});
