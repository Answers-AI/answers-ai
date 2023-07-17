describe('chat spec', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/chat');
  });

  it('visits /chat and chats with the AI', () => {
    cy.intercept('/api/ai/stream').as('completionRequest');

    cy.get('#user-chat-input').type("say 'hello world'" + '{enter}');
    cy.get('[data-cy="message"][data-role="user"]').should('exist');
    cy.get('[data-cy="message"][data-role="loading"]').should('exist');

    cy.wait('@completionRequest').then((interception) => {
      cy.get('[data-cy="message"][data-role="assistant"]').should('exist');
    });
  });

  it('creates a new chat from an existing chat', () => {
    cy.intercept('/api/ai/stream').as('completionRequest');

    cy.get('#user-chat-input').type("say 'hello world'" + '{enter}');
    cy.get('[data-cy="message"][data-role="user"]').should('exist');
    cy.get('[data-cy="message"][data-role="loading"]').should('exist');

    cy.wait('@completionRequest').then((interception) => {
      cy.get('[data-test-id="new-chat-button"]').click();
      cy.get('[data-cy="message"][data-role="user"]').should('not.exist');
      cy.get('#user-chat-input').should('be.be.empty');
    });
  });

  it('adds a file source and links it to the chat', () => {
    cy.intercept('/api/ai/stream').as('completionRequest');

    cy.get('[data-cy="source-files-button"]').click();
    cy.get('[data-cy="select-sources-button"]').click();
    cy.get('[data-cy="new-document-modal-add-button"]').click();
    cy.get('[data-cy="new-document-modal-title-input"]').type('Test File');
    cy.get('[data-cy="new-document-modal-content-input"]').type('Test Content');
    cy.get('[data-cy="new-document-modal-complete-add-button"]').click();
    cy.get('[data-cy="source-file-autocomplete-input"]').type('Test File');
    cy.get('[data-cy="autocomplete-select-checkbox"]').first().click();
    cy.get('[data-cy="source-chip-file"]').should('exist');
  });
});
