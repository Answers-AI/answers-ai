Summary:
This code defines a TypeScript module that exports a constant object called "sidekick". The purpose of this module is to provide a sidekick object that can be used in a broader software application. The sidekick object contains various properties and methods related to planning and prioritizing a week.

Import statements:
- The code imports the "Sidekick" type from the "types" module. This type is used to define the type of the "sidekick" object.

Script Summary:
The script defines a constant object called "sidekick" that represents a sidekick in the software application. It has properties such as "departments", "label", "value", "placeholder", "getSystemPromptTemplate", "getUserPromptTemplate", and "contextStringRender". These properties define the behavior and data of the sidekick.

Internal Functions:
- getSystemPromptTemplate: This function returns a system prompt template that provides instructions on how to use the sidekick as a project manager. It returns a string.
- getUserPromptTemplate: This function returns a user prompt template that includes the given query and context. It returns a string.
- contextStringRender: This function returns a string representation of the given context, including the file path and text.

External Functions:
None

Interaction Summary:
This module can be imported and used in other parts of the software application to access the sidekick object and its properties. The sidekick object can be used to plan and prioritize a week by generating a schedule, providing suggestions, and asking questions.

Developer Questions:
- How can I modify the "departments" property of the sidekick object?
- How can I change the label, value, and placeholder of the sidekick object?
- How can I customize the system prompt template, user prompt template, and context string render functions?
- How can I use the sidekick object in other parts of the application to plan and prioritize a week?