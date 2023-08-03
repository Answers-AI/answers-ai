import React from 'react';
import { mount } from './mount';
import Cookies from 'js-cookie';

import SidekickSelect from './SidekickSelect';

describe('SidekickSelect component', () => {
  beforeEach(() => {
    mount(
      <SidekickSelect
        onSidekickSelected={cy.stub().as('onSidekickSelected')}
        sidekicks={[
          {
            id: '1',
            isGlobal: true,
            isSystem: false,
            isSharedWithOrg: false,
            isFavoriteByDefault: false,
            tags: '',
            label: 'Sidekick 1',
            placeholder: '',
            temperature: 0.6,
            frequency: 0.2,
            presence: 0.8,
            maxCompletionTokens: 100,
            aiModel: 'gpt-3.5-turbo',
            systemPromptTemplate: '',
            userPromptTemplate: '',
            contextStringRender: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUser: {
              id: 'user1',
              role: 'user',
              name: 'User 1',
              email: 'user1@example.com',
              emailVerified: new Date(),
              invited: new Date(),
              image: '',
              accounts: {
                id: 'account1',
                userId: 'user1',
                type: '',
                provider: '',
                providerAccountId: '',
                refresh_token: '',
                refresh_token_expires_in: 0,
                access_token: '',
                expires_at: 0,
                token_type: '',
                scope: '',
                id_token: '',
                session_state: '',
                state: '',
                ok: true,
                user: {
                  id: 'user1',
                  role: 'user',
                  name: 'User 1',
                  email: 'user1@example.com',
                  emailVerified: new Date(),
                  invited: new Date(),
                  image: '',
                  accounts: {
                    id: 'account1',
                    userId: 'user1',
                    type: '',
                    provider: '',
                    providerAccountId: '',
                    refresh_token: '',
                    refresh_token_expires_in: 0,
                    access_token: '',
                    expires_at: 0,
                    token_type: '',
                    scope: '',
                    id_token: '',
                    session_state: '',
                    state: '',
                    ok: true,
                    user: null,
                    organization: null
                  },
                  sessions: {
                    id: 'session1',
                    sessionToken: '',
                    userId: 'user1',
                    expires: new Date(),
                    user: null
                  },
                  currentOrganization: null,
                  organizations: [],
                  appSettings: null,
                  chats: [],
                  chatsCreated: [],
                  messages: [],
                  prompts: [],
                  journeys: [],
                  feedbacks: [],
                  createdAt: new Date(),
                  updatedAt: new Date()
                },
                organization: null
              },
              organization: null
            },
            userId: 'user1',
            favoritedBy: null
          },
          {
            id: '2',
            isGlobal: true,
            isSystem: false,
            isSharedWithOrg: false,
            isFavoriteByDefault: false,
            tags: '',
            label: 'Sidekick 2',
            placeholder: '',
            temperature: 0.6,
            frequency: 0.2,
            presence: 0.8,
            maxCompletionTokens: 100,
            aiModel: 'gpt-3.5-turbo',
            systemPromptTemplate: '',
            userPromptTemplate: '',
            contextStringRender: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            createdByUser: {
              id: 'user1',
              role: 'user',
              name: 'User 1',
              email: 'user1@example.com',
              emailVerified: new Date(),
              invited: new Date(),
              image: '',
              accounts: {
                id: 'account1',
                userId: 'user1',
                type: '',
                provider: '',
                providerAccountId: '',
                refresh_token: '',
                refresh_token_expires_in: 0,
                access_token: '',
                expires_at: 0,
                token_type: '',
                scope: '',
                id_token: '',
                session_state: '',
                state: '',
                ok: true,
                user: {
                  id: 'user1',
                  role: 'user',
                  name: 'User 1',
                  email: 'user1@example.com',
                  emailVerified: new Date(),
                  invited: new Date(),
                  image: '',
                  accounts: {
                    id: 'account1',
                    userId: 'user1',
                    type: '',
                    provider: '',
                    providerAccountId: '',
                    refresh_token: '',
                    refresh_token_expires_in: 0,
                    access_token: '',
                    expires_at: 0,
                    token_type: '',
                    scope: '',
                    id_token: '',
                    session_state: '',
                    state: '',
                    ok: true,
                    user: null,
                    organization: null
                  },
                  sessions: {
                    id: 'session1',
                    sessionToken: '',
                    userId: 'user1',
                    expires: new Date(),
                    user: null
                  },
                  currentOrganization: null,
                  organizations: [],
                  appSettings: null,
                  chats: [],
                  chatsCreated: [],
                  messages: [],
                  prompts: [],
                  journeys: [],
                  feedbacks: [],
                  createdAt: new Date(),
                  updatedAt: new Date()
                },
                organization: null
              },
              organization: null
            },
            userId: 'user1',
            favoritedBy: null
          }
        ]}
      />
    );
  });

  it('renders the SidekickSelect component', () => {
    cy.getByText('Sidekick 1').should('exist');
    cy.getByText('Sidekick 2').should('exist');
  });

  it('calls onSidekickSelected when a sidekick is selected', () => {
    cy.getByLabelText('Sidekick').select('1');
    cy.get('@onSidekickSelected').should('be.calledWith', {
      id: '1',
      isGlobal: true,
      isSystem: false,
      isSharedWithOrg: false,
      isFavoriteByDefault: false,
      tags: '',
      label: 'Sidekick 1',
      placeholder: '',
      temperature: 0.6,
      frequency: 0.2,
      presence: 0.8,
      maxCompletionTokens: 100,
      aiModel: 'gpt-3.5-turbo',
      systemPromptTemplate: '',
      userPromptTemplate: '',
      contextStringRender: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdByUser: {
        id: 'user1',
        role: 'user',
        name: 'User 1',
        email: 'user1@example.com',
        emailVerified: new Date(),
        invited: new Date(),
        image: '',
        accounts: {
          id: 'account1',
          userId: 'user1',
          type: '',
          provider: '',
          providerAccountId: '',
          refresh_token: '',
          refresh_token_expires_in: 0,
          access_token: '',
          expires_at: 0,
          token_type: '',
          scope: '',
          id_token: '',
          session_state: '',
          state: '',
          ok: true,
          user: {
            id: 'user1',
            role: 'user',
            name: 'User 1',
            email: 'user1@example.com',
            emailVerified: new Date(),
            invited: new Date(),
            image: '',
            accounts: {
              id: 'account1',
              userId: 'user1',
              type: '',
              provider: '',
              providerAccountId: '',
              refresh_token: '',
              refresh_token_expires_in: 0,
              access_token: '',
              expires_at: 0,
              token_type: '',
              scope: '',
              id_token: '',
              session_state: '',
              state: '',
              ok: true,
              user: null,
              organization: null
            },
            sessions: {
              id: 'session1',
              sessionToken: '',
              userId: 'user1',
              expires: new Date(),
              user: null
            },
            currentOrganization: null,
            organizations: [],
            appSettings: null,
            chats: [],
            chatsCreated: [],
            messages: [],
            prompts: [],
            journeys: [],
            feedbacks: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          organization: null
        },
        organization: null
      },
      userId: 'user1',
      favoritedBy: null
    });
  });

  it('updates the sidekick history in cookies when a sidekick is selected', () => {
    cy.getByLabelText('Sidekick').select('2');
    cy.window()
      .its('Cookies.get')
      .should('be.calledWith', 'sidekickHistory')
      .and('return', JSON.stringify({ lastUsed: '2' }));
    cy.window()
      .its('Cookies.set')
      .should('be.calledWith', 'sidekickHistory', JSON.stringify({ lastUsed: '2' }));
  });
});
