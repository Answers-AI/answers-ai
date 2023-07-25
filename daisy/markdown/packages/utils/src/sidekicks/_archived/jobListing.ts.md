Summary:
This code is a TypeScript module that exports a default object called `defaultPrompt`. The purpose of this module is to provide a default prompt template for a sidekick feature in a software application. The sidekick assists users in creating job listings for AnswerAI. The `defaultPrompt` object contains various properties and methods that define the prompt template and its behavior.

Import statements:
- `import { Sidekick } from 'types';`: This import statement imports the `Sidekick` type from a module called 'types'. The `Sidekick` type is likely a custom type defined elsewhere in the application.

Script Summary:
The script defines a default prompt template for the sidekick feature. The `defaultPrompt` object contains properties such as `departments`, `label`, `value`, `placeholder`, and methods like `getSystemPromptTemplate`, `getUserPromptTemplate`, and `contextStringRender`. These properties and methods define the content and behavior of the prompt template.

Internal Functions:
- `getSystemPromptTemplate(): string`: This function returns a string that represents the system prompt template. It does not take any parameters and always returns the same string.

- `getUserPromptTemplate(query: string, context: any): string`: This function takes two parameters: `query` (a string representing the user's query) and `context` (an object representing the brand context and information about AnswerAI). It returns a string that represents the user prompt template. The function interpolates the `query` and `context` values into the template string and returns the result.

- `contextStringRender(context: any): string`: This function takes a single parameter `context` (an object representing the brand context and information about AnswerAI). It returns a string that represents the rendered context information. The function interpolates the `context` values into a template string and returns the result.

External Functions:
None.

Interaction Summary:
This module exports the `defaultPrompt` object, which can be imported and used by other modules in the application. The `defaultPrompt` object provides a default prompt template for the sidekick feature, which can be customized or extended as needed.

Developer Questions:
- How can I customize the prompt template?
- How can I add additional departments to the `departments` property?
- How can I modify the behavior of the `getUserPromptTemplate` function?
- How can I handle errors or edge cases in the `contextStringRender` function?
- How can I use the `defaultPrompt` object in other parts of the application?