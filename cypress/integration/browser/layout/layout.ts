import {
  Given,
  When,
  Then,
  Before,
  And,
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

Then(`Saved queries are presented on a screen`, () => {
  cy.contains('Query 01').should('exist');
});

And(`Details are presented in columns`, () => {
  cy.contains('Name').should('exist');
  cy.contains('Tags').should('exist');
  cy.contains('Updated').should('exist');
});
