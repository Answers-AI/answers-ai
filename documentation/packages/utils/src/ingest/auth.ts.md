Filepath: packages/utils/src/ingest/auth.ts
Overview: Summary:
This file contains code related to authentication and user sessions. It includes event handlers for user sign-in, user creation, and syncing app settings.

Import statements:
- `prisma` from `db/dist`: a database client for interacting with the database
- `Session` from `next-auth/core/types`: a type definition for user sessions
- `syncAppSettings` from `../auth/syncAppSettings`: a function for syncing app settings
- `EventVersionHandler` from `./EventVersionHandler`: a type definition for event handlers

Script Summary:
This file exports three event handlers for user sign-in, user creation, and syncing app settings. Each event handler is an object with a version number, event name, and handler function.

Internal Functions:
None

External Functions:
- `authSession`: an event handler for syncing app settings. It takes an event object with a user ID and calls `syncAppSettings` with the user ID.
- `authUserSignIn`: an event handler for user sign-in. It takes an event object with a chat ID, role, and content, and calls `syncAppSettings` with the user ID.
- `authCreateUser`: an event handler for user creation. It takes an event object with a chat ID, role, and content, and calls `syncAppSettings` with the user ID.

Interaction Summary:
This file interacts with the rest of the application by providing event handlers for user sessions and authentication. These event handlers can be triggered by other parts of the application, such as user sign-in or user creation. The `syncAppSettings` function is also used to sync app settings for a given user.

Developer Questions:
- What other parts of the application trigger these event handlers?
- How is the `syncAppSettings` function implemented?
- What other authentication-related functionality does the application have?

