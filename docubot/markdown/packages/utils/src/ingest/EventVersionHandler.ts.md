Summary:
This file exports a function that creates Inngest functions based on event handlers. It also exports types for event handlers and event version handlers.

Import statements:
- `inngest` from `./client`: Inngest is a serverless event processing platform.
- `AppSettings` from `types`: AppSettings is a type for application settings.
- `User` from `db/generated/prisma-client`: User is a type for user data.
- `createStepTools` from `inngest/components/InngestStepTools`: createStepTools is a function that creates step tools for Inngest.

Script Summary:
The `createInngestFunctions` function takes an array of event version handlers and creates Inngest functions based on them. It groups the event version handlers by event name and version, and creates a function for each event name. Each function processes the event by calling the corresponding event handler. If the event handler is not found, an error is thrown.

Internal Functions:
- `createInngestFunctions`: This function takes an array of event version handlers and creates Inngest functions based on them. It groups the event version handlers by event name and version, and creates a function for each event name. Each function processes the event by calling the corresponding event handler. If the event handler is not found, an error is thrown.

External Functions:
- `EventHandler`: This type defines the signature of an event handler function. It takes an object with an event property, a step property, and returns a Promise.
- `EventVersionHandler`: This type defines the signature of an event version handler object. It has an event property, a v property, and a handler property.
- `JiraUpdatedInput`: This type defines the signature of an input object for a Jira update event. It has an appSettings property.

Interaction Summary:
This file interacts with Inngest to create serverless functions that process events based on event handlers. It also interacts with other parts of the application through the types it exports.

Developer Questions:
- What is the format of the event object passed to the event handler function?
- How do I add a new event handler?
- How do I test the Inngest functions created by this file?

Known Issues and TODOs:
- None