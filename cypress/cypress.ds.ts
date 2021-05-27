/* eslint-disable @typescript-eslint/no-namespace */
declare namespace Cypress {
  interface Chainable {
    addExtractionProperty(propertyName: string): void;
  }
}
