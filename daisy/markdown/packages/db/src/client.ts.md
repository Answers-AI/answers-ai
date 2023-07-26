Summary:
This code is responsible for configuring and customizing the PrismaClient, which is a database client used in the broader software application. It sets up soft delete functionality for certain models and modifies query actions to handle soft deletes.

Import statements:
- `PrismaClient` is imported from the `../generated/prisma-client` file. This is the main class provided by Prisma for interacting with the database.

Script Summary:
- The script defines a constant `DEBUG_LEVEL` which is used to determine the level of debugging information to be logged.
- The `prisma` variable is declared as a global variable, either using an existing global `prisma` object or creating a new instance of `PrismaClient` with the specified debug level.
- If the environment is not production, the `prisma` object is assigned to the global `prisma` variable.
- The `SOFT_DELETE_MODELS` constant is an array of model names that should support soft delete functionality.
- The script adds middleware functions to the `prisma` object to handle soft deletes and modify query actions accordingly.

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
This script interacts with the PrismaClient to configure its behavior and add custom functionality. It modifies query actions for soft delete models and handles soft deletes by changing the action to an update and setting the `deleted` field to true.

Developer Questions:
- How can I enable soft delete functionality for additional models?
- How can I customize the debug level for the `prisma` object?
- How can I modify the middleware functions to handle additional query actions?
- How can I restrict updating "soft deleted" records? (Uncommented code block)
- How can I handle soft deletes for other types of actions, such as create or update?