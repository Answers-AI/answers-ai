import { mount } from '@cypress/react';
import { Message } from './Message';

describe('Message', () => {
  const defaultProps = {
    id: 'test-id',
    content: 'Test content',
    role: 'user',
    user: { name: 'John Doe' },
    likes: 0,
    dislikes: 0,
    isWidget: false
  };

  it('renders correctly', () => {
    mount(<Message {...defaultProps} />);
    cy.get('[data-cy=message]').should('exist');
    cy.contains(defaultProps.content);
    cy.contains(defaultProps.user.name.charAt(0));
  });

  it('handles likes', () => {
    mount(<Message {...defaultProps} />);
    cy.get('[data-cy=like-button]').click();
    cy.get('[data-cy=like-button]').should('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('handles dislikes', () => {
    mount(<Message {...defaultProps} />);
    cy.get('[data-cy=dislike-button]').click();
    cy.get('[data-cy=dislike-button]').should('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('renders developer_mode when enabled', () => {
    mount(<Message {...defaultProps} developer_mode={{ enabled: true }} />);
    cy.get('[data-cy=accordion]').should('exist');
  });

  it('does not render developer_mode when disabled', () => {
    mount(<Message {...defaultProps} developer_mode={{ enabled: false }} />);
    cy.get('[data-cy=accordion]').should('not.exist');
  });
});
