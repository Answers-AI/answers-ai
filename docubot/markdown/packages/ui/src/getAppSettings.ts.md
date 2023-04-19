Summary:
This file contains a function called `getAppSettings` which retrieves application settings based on the user's session and organization. It uses various dependencies such as `next-auth`, `deepmerge`, and `prisma`.

Import statements:
- `getServerSession` from `next-auth`: used to retrieve the user's session
- `deepmerge` from `@utils/deepmerge`: used to merge settings objects
- `authOptions` from `./authOptions`: contains authentication options
- `NO_ORG_SETTINGS` from `@utils/auth/NO_ORG_SETTINGS`: contains default settings for users without an organization
- `SYSTEM_SETTINGS` from `@utils/auth/SYSTEM_SETTINGS`: contains default settings for the system
- `prisma` from `db/dist`: used to interact with the database
- `MODELS` from `@utils/MODELS`: contains models for the application
- `AppSettings` from `types`: defines the shape of the application settings object

Script Summary:
The `getAppSettings` function retrieves the user's session and organization (if applicable) and uses that information to determine the appropriate application settings. It first sets the `services` variable to the default system settings. If a user is logged in, it retrieves their account information and updates the `services` variable to reflect which services are enabled based on the user's accounts. If the user has an organization, it merges the organization's app settings with the default settings and returns the resulting object. If the user does not have an organization, it returns the default settings for users without an organization.

Internal Functions:
- `getAppSettings`: retrieves the user's session and organization (if applicable) and uses that information to determine the appropriate application settings. Parameters: `req` (optional) and `res` (optional), which are used to retrieve the user's session. Returns: a Promise that resolves to an object of type `AppSettings`.

External Functions:
None

Interaction Summary:
This file interacts with the `next-auth` library to retrieve the user's session, the `prisma` library to interact with the database, and various utility files (`@utils/deepmerge`, `@utils/auth/NO_ORG_SETTINGS`, `@utils/auth/SYSTEM_SETTINGS`, and `@utils/MODELS`) to retrieve default settings and models for the application.

Developer Questions:
- What are the possible values for the `services` variable?
- What is the shape of the `user` object returned by `prisma.user.findUnique`?
- What is the shape of the `accounts` array returned by `prisma.account.findMany`?
- What is the shape of the `settings` object returned by `getAppSettings`?
- How does the `deepmerge` function work and why is it used here?
- What other files in the application use the `getAppSettings` function?