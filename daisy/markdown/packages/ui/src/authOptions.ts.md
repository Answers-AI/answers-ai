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
The script sets up the authentication options for the Next.js application using NextAuth. It defines the session cookie settings, session and adapter options, callbacks for JWT and session handling, and various authentication providers. It also includes an event handler for user-related events.

Internal Functions:
- `refreshAccessToken`: This function is used to refresh the access token for the Atlassian provider. It checks if the access token has expired and tries to refresh it using the refresh token. If successful, it updates the access token and expiration time in the database.

External Functions:
None

Interaction Summary:
This script interacts with the NextAuth library and various authentication providers to handle user authentication and session management. It also interacts with the Prisma database for user and account data storage. Additionally, it sends user-related events to an external service using the `inngest` function.

Developer Questions:
- How can I add a new authentication provider?
- How can I customize the session cookie settings?
- How can I handle additional user events?
- How can I modify the user data stored in the session?
- How can I customize the JWT token handling?
- How can I handle errors during token refresh?
- How can I customize the redirect behavior after authentication?