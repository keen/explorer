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

When(
  `I select saved query that is build on a event stream that do not exist`,
  () => {
    cy.intercept(
      'GET',
      'https://api.keen.io/3.0/projects/*/events/*?api_key=*',
      {
        statusCode: 404,
      }
    ).as('missing-event-stream');
    cy.get('[data-testid="saved-query-item"]')
      .contains('Query with missing event stream')
      .click();
    cy.wait('@missing-event-stream');
  }
);

Then(`Share query button should not be visible`, () => {
  cy.get('[data-testid="share-query"]').should('not.exist');
});

And(`Query settings button should not be visible`, () => {
  cy.get('[data-testid="query-settings"]').should('not.exist');
});

And(`Edit query button should be disabled`, () => {
  cy.get('[data-testid="button"]').contains('Edit Query').click();
  cy.location('pathname').should('equal', '/');
});
