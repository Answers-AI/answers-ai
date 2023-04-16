Filepath: packages/utils/src/ingest/prompt.ts
Overview: Summary:
This file contains two event handlers for the "answers/prompt.upserted" and "answers/prompt.answered" events. These handlers interact with the Prisma ORM to create or update prompts and connect answers to them.

Import statements:
- "db/dist": This is a third-party library that provides a database client for Prisma ORM.
- "db/generated/prisma-client": This is a generated module that provides the Prisma client for the application.
- "types": This is a module that defines types used in the application.
- "./EventVersionHandler": This is a module that defines a type for event handlers.

Script Summary:
The file exports two event handlers, "answersPromptUpserted" and "answersPromptAnswered". The "answersPromptUpserted" handler creates or updates a prompt in the database based on the "answers/prompt.upserted" event. The "answersPromptAnswered" handler connects an answer to a prompt in the database based on the "answers/prompt.answered" event.

Internal Functions:
- None

External Functions:
- "answersPromptUpserted": This function is an event handler that takes an event object as a parameter and creates or updates a prompt in the database based on the event data. It returns nothing.
- "answersPromptAnswered": This function is an event handler that takes an event object as a parameter and connects an answer to a prompt in the database based on the event data. It returns nothing.

Interaction Summary:
This file interacts with the Prisma ORM to create or update prompts and connect answers to them. It is likely used in conjunction with other modules to handle events and perform other actions based on those events.

Developer Questions:
- What other modules interact with this file?
- What other events trigger actions in this file?
- What is the structure of the event objects passed to the event handlers?
- What other actions can be performed on prompts and answers in the database?

