Summary:
This file contains two event handlers for the "answers/prompt.upserted" and "answers/prompt.answered" events. These handlers interact with the Prisma ORM to create, update, and retrieve data related to prompts and messages.

Import statements:
- "prisma" from "db/dist": Prisma ORM instance for database operations
- "Chat" from "db/generated/prisma-client": Prisma-generated type for Chat model
- "Message" from "types": Custom type for Message model
- "EventVersionHandler" from "./EventVersionHandler": Custom type for event handlers

Script Summary:
- "answersPromptUpserted": Event handler for "answers/prompt.upserted" event
- "answersPromptAnswered": Event handler for "answers/prompt.answered" event
- Both handlers use Prisma ORM to create, update, and retrieve data related to prompts and messages

Internal Functions:
- None

External Functions:
- "answersPromptUpserted": Event handler function that takes in an event object and uses Prisma ORM to create or update a prompt based on the event data. Returns nothing.
- "answersPromptAnswered": Event handler function that takes in an event object and uses Prisma ORM to connect a message to a prompt based on the event data. Returns nothing.

Interaction Summary:
- This file interacts with the Prisma ORM to create, update, and retrieve data related to prompts and messages.
- It is likely used in conjunction with other files to handle events and perform other application logic.

Developer Questions:
- What other files use these event handlers?
- What other events do we need to handle in this application?
- What other models do we need to interact with using Prisma ORM?
- How can we test these event handlers?