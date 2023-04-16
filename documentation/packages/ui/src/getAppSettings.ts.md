Filepath: packages/ui/src/getAppSettings.ts
Overview: Summary:
This file contains a function called `getAppSettings` which retrieves the application settings for a user. It uses various dependencies and imports to accomplish this task.

Import statements:
- `getServerSession` from `next-auth`: used to retrieve the user session
- `deepmerge` from `@utils/deepmerge`: used to merge the user and system settings
- `authOptions` from `./authOptions`: contains authentication options for the application
- `NO_ORG_SETTINGS` from `@utils/auth/NO_ORG_SETTINGS`: contains default settings for users without an organization
- `SYSTEM_SETTINGS` from `@utils/auth/SYSTEM_SETTINGS`: contains default settings for the application
- `prisma` from `db/dist`: used to interact with the database
- `MODELS` from `@utils/MODELS`: contains the models for the application
- `AppSettings` from `types`: defines the shape of the application settings object

Script Summary:
The `getAppSettings` function retrieves the user session and checks if the user has an organization. If the user has an organization, it retrieves the user's app settings from the database and merges them with the system settings. If the user does not have an organization, it uses the default settings for users without an organization.

Internal Functions:
- `getAppSettings`: retrieves the application settings for a user. Parameters: `req` (optional) and `res` (optional). Returns: a Promise that resolves to an `AppSettings` object.

External Functions:
None

Interaction Summary:
This file interacts with the database through `prisma` to retrieve user and account information. It also interacts with `next-auth` to retrieve the user session. The `deepmerge` function is used to merge the user and system settings. The `MODELS` object is used to define the models for the application.

Developer Questions:
- What are the different services and how are they enabled/disabled?
- What is the shape of the `AppSettings` object?
- How are the user's app settings merged with the system settings?
- What happens if the user does not have an organization?
- How is the `prisma` object configured to interact with the database?

