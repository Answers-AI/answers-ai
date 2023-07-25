Summary:
This code defines a TypeScript module that exports a variable named "sidekick". The "sidekick" object contains various properties and methods related to creating outbound sales emails. It includes templates for system prompts, user prompts, and context string rendering.

Import statements:
- The code imports the "Sidekick" type from the "types" module.
- The "Sidekick" type is used to define the type of the "sidekick" variable.

Script Summary:
The script defines an object named "sidekick" that represents an outbound email creator. It has properties such as "departments", "label", "value", "temperature", "frequency", "presence", "maxCompletionTokens", "placeholder", and various methods for generating prompt templates and rendering context strings.

Internal Functions:
- getSystemPromptTemplate(): This function returns a template string for the system prompt. It includes information about the brand tone and voice.
- getUserPromptTemplate(query, context): This function returns a template string for the user prompt. It provides guidelines for creating a good outbound sales email and includes the query and context as placeholders.
- contextStringRender(context): This function returns a template string for rendering the context string. It includes the file path and text of the context.

External Functions:
None

Interaction Summary:
This script can be imported and used by other parts of the application that require an outbound email creator. The "sidekick" object can be accessed to retrieve prompt templates and render context strings.

Developer Questions:
- How can I modify the prompt templates to fit my specific requirements?
- Can I add more properties or methods to the "sidekick" object?
- How can I integrate the "sidekick" object with other parts of the application?
- Are there any potential issues or bugs in this code?
- How can I test the functionality of the "sidekick" object?