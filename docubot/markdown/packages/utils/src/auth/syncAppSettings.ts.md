Summary:
This file contains a function called `syncAppSettings` and two helper functions called `updateUserSettings` and `updateOrgSettings`. These functions are responsible for syncing user and organization app settings with the database.

Import statements:
The file imports `User` and `Organization` types from a module called `types`, `prisma` from a module called `db/dist`, `buildSettings` from a local module called `buildSettings`, and `SYSTEM_SETTINGS` from a local module called `SYSTEM_SETTINGS`.

Script Summary:
The `syncAppSettings` function takes an object with two optional parameters, `userId` and `organizationId`. It first checks if `userId` is truthy. If it is not, it logs a message and returns `SYSTEM_SETTINGS`. If it is truthy, it queries the database for a user with the given `userId` and includes their associated accounts. If the user exists, it checks if `organizationId` is truthy. If it is, it queries the database for an organization with the given `organizationId` that the user is associated with, and calls `updateOrgSettings` with the user and organization as arguments. If `organizationId` is not truthy but the user has an associated organization, it queries the database for the user's organization and calls `updateUserSettings` with the user as an argument. If the user does not have an associated organization, it creates a new organization with the user as a connected user and calls `updateUserSettings` with the user as an argument. If the user does not exist, it returns `SYSTEM_SETTINGS`.

The `updateUserSettings` function takes a `user` object as an argument and queries the database to build the user's app settings using the `buildSettings` function. It then updates the user's `appSettings` field in the database with the new app settings.

The `updateOrgSettings` function takes a `user` object and an `org` object as arguments and queries the database to build the organization's app settings using the `buildSettings` function. It then updates the user's `appSettings` field in the database with the new app settings.

Internal Functions:
- `updateUserSettings(user: User)`: Takes a `user` object as an argument and queries the database to build the user's app settings using the `buildSettings` function. It then updates the user's `appSettings` field in the database with the new app settings.
- `updateOrgSettings(user: User, org: Organization)`: Takes a `user` object and an `org` object as arguments and queries the database to build the organization's app settings using the `buildSettings` function. It then updates the user's `appSettings` field in the database with the new app settings.

External Functions:
- `syncAppSettings({ userId, organizationId }: { userId: string; organizationId?: string; })`: Takes an object with two optional parameters, `userId` and `organizationId`. It first checks if `userId` is truthy. If it is not, it logs a message and returns `SYSTEM_SETTINGS`. If it is truthy, it queries the database for a user with the given `userId` and includes their associated accounts. If the user exists, it checks if `organizationId` is truthy. If it is, it queries the database for an organization with the given `organizationId` that the user is associated with, and calls `updateOrgSettings` with the user and organization as arguments. If `organizationId` is not truthy but the user has an associated organization, it queries the database for the user's organization and calls `updateUserSettings` with the user as an argument. If the user does not have an associated organization, it creates a new organization with the user as a connected user and calls `updateUserSettings` with the user as an argument. If the user does not exist, it returns `SYSTEM_SETTINGS`.

Interaction Summary:
This file interacts with the Prisma ORM to query and update the database. It also imports a `buildSettings` function from a local module to build app settings.

Developer Questions:
- What are the expected fields in the `appSettings` object?
- How does the `buildSettings` function work?
- What is the purpose of the `SYSTEM_SETTINGS` constant?
- What is the expected format of the `userId` and `organizationId` parameters?

Known Issues and TODOs:
- There are no known issues or bugs with this component.
- TODO: Move the middleware code to a separate module.
- TODO: Verify user ownership or permission scope.
- TODO: Enable user app settings.
- TODO: Verify role to update org settings.