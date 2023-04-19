Summary:
This file contains the authentication options for the Next.js application. It imports various authentication providers and sets up the necessary configurations for each provider. It also defines the authentication options for the application, including cookies, session, and adapter.

Import statements:
- AuthOptions and DefaultSession from 'next-auth'
- GithubProvider from 'next-auth/providers/github'
- GoogleProvider from 'next-auth/providers/google'
- AtlassianProvider from 'next-auth/providers/atlassian'
- SlackProvider from 'next-auth/providers/slack'
- CredentialsProvider from 'next-auth/providers/credentials'
- PrismaAdapter from '@next-auth/prisma-adapter'
- prisma from 'db/dist'
- inngest from '@utils/ingest/client'
- User from 'types'

Script Summary:
- Defines the authentication options for the Next.js application
- Imports various authentication providers and sets up the necessary configurations for each provider
- Defines the authentication options for the application, including cookies, session, and adapter
- Defines the events that should be triggered when a user signs in, signs out, creates a user, updates a user, or links an account

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
This file is responsible for setting up the authentication options for the Next.js application. It interacts with various authentication providers, including Github, Google, Atlassian, Slack, and Credentials. It also interacts with the Prisma adapter for database operations. Additionally, it triggers events when a user signs in, signs out, creates a user, updates a user, or links an account.

Developer Questions:
- What are the available authentication providers and how do they work?
- How does the Prisma adapter work and what database operations can be performed using it?
- What events are triggered when a user signs in, signs out, creates a user, updates a user, or links an account?