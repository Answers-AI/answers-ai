describe('homepage spec', () => {
  it('visits / and checks for a sign in button', () => {
    cy.visit('/');
    cy.contains('Answers AI');

    cy.contains('sign in with api key', { matchCase: false })
      .click()
      .then(() => {
        // cy.get('#input-apiKey-for-app-widget-provider').type('test');
      });
  });
});
