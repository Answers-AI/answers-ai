Filepath: packages/utils/src/ingest/EventVersionHandler.ts
Overview: Summary:
This file contains a function that creates Inngest functions based on event handlers. It also defines types for event handlers and event version handlers.

Import statements:
- `inngest` from './client': a third-party library for handling serverless functions
- `AppSettings` from 'types': a custom type for application settings
- `User` from 'db/generated/prisma-client': a custom type for user data
- `createStepTools` from 'inngest/components/InngestStepTools': a function for creating step tools

Script Summary:
- `createInngestFunctions`: a function that takes an array of event version handlers and returns an array of Inngest functions
- `EventHandler`: a type for event handlers that takes an object with an event, step, and user property and returns a Promise
- `EventVersionHandler`: a type for event version handlers that takes an event, version, and handler property

Internal Functions:
- None

External Functions:
- `createInngestFunctions(eventHandlers: EventVersionHandler<unknown>[]): inngestFunctions`: a function that takes an array of event version handlers and returns an array of Inngest functions

Interaction Summary:
This file interacts with the Inngest library to create serverless functions based on event handlers. It also interacts with custom types for application settings and user data.

Developer Questions:
- What is the purpose of the Inngest library and how does it work?
- What are the possible values for the event and version properties in the event version handler?
- What is the createStepTools function and how is it used in the EventHandler type?

