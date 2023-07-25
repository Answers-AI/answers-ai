Summary:
This code defines a TypeScript module that exports a constant object called "sidekick". The purpose of this module is to provide a sidekick object that can be used in a broader software application. The sidekick object contains various properties and methods related to planning and prioritizing a week.

Import statements:
- The code imports the "Sidekick" type from the "types" module. This type is used to define the type of the "sidekick" object.
- The code does not import any other modules or dependencies.

Script Summary:
The script defines a constant object called "sidekick" that represents a sidekick for planning and prioritizing a week. The object has several properties and methods that provide functionality related to this task.

Internal Functions:
- getSystemPromptTemplate(): This function returns a string that represents a system prompt template for the sidekick. It provides instructions and guidelines for the user to follow when planning their week.

External Functions:
- getUserPromptTemplate(query: string, context: any): This function returns a string that represents a user prompt template for the sidekick. It takes a query string and a context object as parameters and incorporates them into the template.

- contextStringRender(context: any): This function returns a string that represents the rendering of a context object. It takes a context object as a parameter and formats it into a string.

Interaction Summary:
This module can be imported and used in other parts of the software application to provide functionality related to planning and prioritizing a week. Other modules can access the properties and methods of the "sidekick" object to interact with it.

Developer Questions:
- How can I modify the system prompt template provided by the sidekick?
- How can I modify the user prompt template provided by the sidekick?
- What properties and methods are available on the "sidekick" object?
- How can I integrate the sidekick module into my existing codebase?