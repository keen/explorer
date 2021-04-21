import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';

Given(`I open a Data Explorer application`, () => {
  cy.visit(`${Cypress.env('host')}`);
});

When(`I click on toggle`, () => {
  cy.get('[data-testid="toggle"]').click();
});

And(`I reload the page`, () => {
  cy.reload();
});

Then(`Autorun settings are persisted`, () => {
  cy.get('[data-testid="toggle"]').contains('off');
});
