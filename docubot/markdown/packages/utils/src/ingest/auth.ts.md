Summary:
This file contains event handlers for various authentication-related events in the application. It exports three event handlers that are triggered when a user signs in, links their account, or creates a new account. These event handlers call a function to sync the user's app settings.

Import statements:
- `prisma` from `db/dist`: A database client for the Prisma ORM.
- `Session` from `next-auth/core/types`: A type definition for a session object used by the Next.js authentication library.
- `syncAppSettings` from `../auth/syncAppSettings`: A function that syncs a user's app settings.
- `EventVersionHandler` from `./EventVersionHandler`: A custom type definition for an event handler.

Script Summary:
This file exports three event handlers for authentication-related events. Each event handler has a `handler` function that calls `syncAppSettings` with the user's ID.

Internal Functions:
None.

External Functions:
- `authSession`: An event handler for the `auth/settings.sync` event. It takes an object with a `user` property containing the user's ID. It calls `syncAppSettings` with the user's ID.
- `authUserSignIn`: An event handler for the `auth/user.signIn` event. It takes an object with `chatId`, `role`, and `content` properties, as well as a `user` property containing the user's ID. It calls `syncAppSettings` with the user's ID.
- `authUserLinkAccount`: An event handler for the `auth/user.linkAccount` event. It takes an object with `chatId`, `role`, and `content` properties, as well as a `user` property containing the user's ID. It calls `syncAppSettings` with the user's ID.
- `authCreateUser`: An event handler for the `auth/user.createUser` event. It takes an object with `chatId`, `role`, and `content` properties, as well as a `user` property containing the user's ID. It calls `syncAppSettings` with the user's ID.

Interaction Summary:
This file is used to handle authentication-related events in the application. When a user signs in, links their account, or creates a new account, the corresponding event handler is triggered. Each event handler calls `syncAppSettings` to sync the user's app settings.

Developer Questions:
- What other events trigger event handlers in the application?
- How is `syncAppSettings` implemented?
- What app settings are being synced?

Known Issues and TODOs:
None mentioned in the code snippet.