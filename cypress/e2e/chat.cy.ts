describe('homepage spec', () => {
  beforeEach(() => {
    cy.login();
  });
  it('visits / and chats with the AI', () => {
    cy.intercept('/api/ai/stream').as('completionRequest');
    cy.visit('/');
    cy.get('#user-chat-input').type("say 'hello world'" + '{enter}');
    cy.get('[data-cy="message"][data-role="user"]').should('exist');
    cy.get('[data-cy="message"][data-role="loading"]').should('exist');

    cy.wait('@completionRequest').then((interception) => {
      cy.get('[data-cy="message"][data-role="assistant"]').should('exist');
    });
  });

  it('creates a new chat from an existing chat', () => {
    cy.intercept('/api/ai/stream').as('completionRequest');
    cy.visit('/');
    cy.get('#user-chat-input').type("say 'hello world'" + '{enter}');
    cy.get('[data-cy="message"][data-role="user"]').should('exist');
    cy.get('[data-cy="message"][data-role="loading"]').should('exist');

    cy.wait('@completionRequest').then((interception) => {
      cy.get('[data-test-id="new-chat-button"]').click();
      cy.get('[data-cy="message"][data-role="user"]').should('not.exist');
      cy.get('#user-chat-input').should('be.be.empty');
    });
  });
});
