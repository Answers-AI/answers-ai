Summary:
This file contains the configuration for authentication options for the Next.js application. It imports various providers for authentication, including Github, Google, Atlassian, Slack, and Credentials. It also imports a Prisma adapter for database integration and a client for ingesting user events. The file defines the authentication options, including session cookies, adapters, callbacks, providers, and events.

Import statements:
- AuthOptions and DefaultSession from 'next-auth'
- Providers for Github, Google, Atlassian, Slack, and Credentials from 'next-auth/providers'
- PrismaAdapter from '@next-auth/prisma-adapter'
- Prisma client from 'db/dist'
- Ingest client from '@utils/ingest/client'
- User type from 'types'

Script Summary:
- Defines the authentication options for the Next.js application
- Includes session cookies, adapters, callbacks, providers, and events
- Imports various providers for authentication, including Github, Google, Atlassian, Slack, and Credentials
- Imports a Prisma adapter for database integration and a client for ingesting user events

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
This file interacts with the rest of the application by providing authentication options for users. It integrates with various providers for authentication, including Github, Google, Atlassian, Slack, and Credentials. It also integrates with a Prisma adapter for database integration and a client for ingesting user events.

Developer Questions:
- What are the available authentication providers?
- How are session cookies configured?
- How does the Prisma adapter integrate with the authentication options?
- How are user events ingested?

Known Issues and TODOs:
- None