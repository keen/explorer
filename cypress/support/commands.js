// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import 'cypress-wait-until';

Cypress.Commands.add('addExtractionProperty', (propertyName) => {
  cy.get('.add-button').click();
  cy.get('[data-testid="properties-tree"]').contains(propertyName).click();
  cy.wait(1000);
});
