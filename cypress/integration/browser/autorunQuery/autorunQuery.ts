import {
  Given,
  When,
  And,
  Then,
  Before,
} from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.intercept(
    'GET',
    'https://api.keen.io/3.0/projects/*/queries/saved?api_key=*&analysis_type=saved',
    {
      statusCode: 200,
      fixture: 'savedQueries.json',
    }
  ).as('saved queries');
});

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
