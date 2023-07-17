describe('chat spec', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    cy.get('[data-cy="new-journey-button"]').click();
  });

  it('visits "/", starts a new journey, gives it a goal, creates the journey, and sends a chat', () => {
    cy.intercept('/api/ai/stream').as('completionRequest');

    cy.get('[data-cy="new-journey-goal-input"]').type('Test Journey');
    cy.get('[data-cy="create-new-journey-button"]').click();

    cy.get('#user-chat-input').type("say 'hello world'" + '{enter}');
    cy.get('[data-cy="message"][data-role="user"]').should('exist');
    cy.get('[data-cy="message"][data-role="loading"]').should('exist');

    cy.wait('@completionRequest').then((interception) => {
      cy.get('[data-cy="message"][data-role="assistant"]').should('exist');
    });
  });
});
