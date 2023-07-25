Summary:
This code is a script that sets up the authentication options for a Next.js application using the NextAuth library. It imports various providers for authentication, such as Google, GitHub, Atlassian, Slack, and Credentials. It also defines the authentication options, including session settings, adapter, callbacks, and event handling. The script includes a function to refresh access tokens for the Atlassian provider.

Import statements:
- `AuthOptions`, `DefaultSession`, and `TokenSet` are imported from the `next-auth` library. These types are used to define the authentication options and session data.
- `GoogleProvider`, `GithubProvider`, `AtlassianProvider`, `SlackProvider`, and `CredentialsProvider` are imported from the `next-auth/providers` module. These providers are used for authentication with Google, GitHub, Atlassian, Slack, and custom credentials, respectively.
- `PrismaAdapter` is imported from the `@next-auth/prisma-adapter` module. This adapter is used to connect NextAuth with a Prisma database.
- `prisma` is imported from the `@db/client` module. This is the Prisma client used to interact with the database.
- `inngest` is imported from the `@utils/ingest/client` module. This is a utility function used to send events to an external service.
- `User`, `AppSettings`, `ContextField`, `Organization`, and `User` are imported from the `types` module. These types define the structure of user data and related entities.

Script Summary:
The script sets up the authentication options for the Next.js application using NextAuth. It defines the session cookie settings, session strategy, adapter, callbacks, providers, and event handling. It also includes a function to refresh access tokens for the Atlassian provider.

Internal Functions:
- `refresAccessToken`: This function is used to refresh the access token for the Atlassian provider. It checks if the access token has expired and if so, sends a request to the Atlassian OAuth token endpoint to refresh the token. The function updates the access token, expiration time, and refresh token in the database.

External Functions:
None

Interaction Summary:
This script interacts with the NextAuth library, Prisma database, and external services for event tracking. It provides the authentication options and handles authentication-related events.

Developer Questions:
- How do I add a new authentication provider?
- How do I customize the session settings?
- How do I handle authentication-related events?
- How do I modify the access token refresh logic for the Atlassian provider?