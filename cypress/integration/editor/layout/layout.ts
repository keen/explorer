import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';

Given(`I open a Data Explorer application in editor view`, () => {
  cy.visit(`${Cypress.env('host')}`);
  cy.contains('New Query').click();
});

Then(`Save query button is presented on a screen`, () => {
  cy.contains('Save Query').should('exist');
});

Then(`Run query button is presented on a screen`, () => {
  cy.contains('Run Query').should('exist');
});

When(`I click on "Analysis" field`, () => {
  cy.contains('count').click();
});

And(`Select "Average" analysis`, () => {
  cy.contains('Average').click();
});

Then(`Target property field is presented on a screen`, () => {
  cy.contains('Target Property').should('exist');
});

When(`I click on "Interval" field`, () => {
  cy.contains('Set interval').click();
});

And(`Select standard "Daily" interval`, () => {
  cy.contains('daily').click();
});

Then(`Interval is set for query`, () => {
  cy.contains('Daily').should('exist');
  cy.contains('Set interval').should('not.exist');
});

When(`I click on "Analysis" field`, () => {
  cy.contains('count').click();
});

And(`Select "Percentile" analysis`, () => {
  cy.contains('Percentile').click();
});

Then(`Percentile field is presented on a screen`, () => {
  cy.get('input').invoke('attr', 'placeholder').should('contain', 'Eg. 75');
});

And(`Target property field is presented on a screen`, () => {
  cy.contains('Target property').should('exist');
});
