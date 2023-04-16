Filepath: packages/ui/src/authOptions.ts
Overview: Summary:
This file contains the authentication options for the Next.js application. It imports various authentication providers and sets up the necessary configurations for each provider. It also defines the authentication options for the application, including cookies, session, adapter, providers, callbacks, and events.

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
- Defines the authentication options for the application, including cookies, session, adapter, providers, callbacks, and events

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
This file interacts with the rest of the application by providing the necessary authentication options for the application. It sets up the authentication providers and defines the necessary configurations for each provider. It also defines the authentication options for the application, including cookies, session, adapter, providers, callbacks, and events.

Developer Questions:
- What are the different authentication providers being used in this file?
- What are the different configurations being set up for each authentication provider?
- What is the purpose of the PrismaAdapter and how is it being used in this file?
- What is the purpose of the inngest library and how is it being used in this file?
- What are the different events being defined in this file and how are they being used in the application?

