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
// -- This is a parent command --

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login the user using default test user.
     * @example cy.login()
     */
    login(): void;
  }
}

Cypress.Commands.add('login', () => {
  const apiKey = Cypress.env('ANSWERS_API_KEY');
  cy.visit('/auth/login');
  cy.get('#input-apiKey-for-app-widget-provider').type(apiKey + '{enter}');
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
