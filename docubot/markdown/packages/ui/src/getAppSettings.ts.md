Summary:
This file exports a function called `getAppSettings` which retrieves and returns the application settings based on the user's session and organization. It uses several dependencies and imports, including `next-auth`, `prisma`, and custom utility functions.

Import statements:
- `getServerSession` from `next-auth`: used to retrieve the user's session
- `deepmerge` from `@utils/deepmerge`: used to merge the user's app settings with the default app settings
- `authOptions` from `./authOptions`: contains the authentication options for `next-auth`
- `NO_ORG_SETTINGS` from `@utils/auth/NO_ORG_SETTINGS`: contains the default app settings for users without an organization
- `SYSTEM_SETTINGS` from `@utils/auth/SYSTEM_SETTINGS`: contains the default app settings for all users
- `prisma` from `db/dist`: used to query the database
- `MODELS` from `@utils/MODELS`: contains the models used in the app
- `AppSettings` from `types`: defines the shape of the app settings object

Script Summary:
The `getAppSettings` function retrieves the user's session using `getServerSession` and then queries the database to retrieve the user's account and organization information. It then merges the user's app settings with the default app settings using `deepmerge` and returns the resulting object.

Internal Functions:
None

External Functions:
- `getAppSettings(req?: any, res?: any): Promise<AppSettings>`: retrieves and returns the application settings based on the user's session and organization. Takes in optional `req` and `res` parameters to retrieve the session from the server.

Interaction Summary:
This file interacts with the `next-auth` library to retrieve the user's session and with the `prisma` library to query the database for user and organization information. It also uses custom utility functions to merge app settings.

Developer Questions:
- What are the default app settings for users without an organization?
- What are the default app settings for all users?
- What is the shape of the `MODELS` object?
- How are the user's app settings merged with the default app settings?
- What happens if the user does not have an account or organization?

Known Issues and TODOs:
None