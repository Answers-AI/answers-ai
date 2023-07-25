Summary:
This code is a TypeScript module that exports a default object called `defaultPrompt`. The purpose of this module is to provide a default prompt template for a sidekick assistant in a software application. The `defaultPrompt` object contains various properties and methods that define the prompt's behavior and content.

Import statements:
- `import { Sidekick } from 'types';`: This import statement imports the `Sidekick` type from a module called 'types'. The `Sidekick` type is likely a custom type definition for the sidekick assistant.

Script Summary:
The script defines a default prompt template for a sidekick assistant. The `defaultPrompt` object contains properties such as `departments`, `label`, `value`, `placeholder`, `getSystemPromptTemplate`, `getUserPromptTemplate`, and `contextStringRender`. These properties define the content and behavior of the prompt.

Internal Functions:
- `getSystemPromptTemplate`: This function is a method of the `defaultPrompt` object. It returns a string that represents the system prompt template for the sidekick assistant. The returned string describes the assistant as helpful and friendly, specializing in helping people with their requests and asking better questions.
- `getUserPromptTemplate`: This function is a method of the `defaultPrompt` object. It takes two parameters, `query` and `context`, and returns a string that represents the user prompt template for the sidekick assistant. The returned string includes the provided `context` and the user's `query` in a formatted manner.
- `contextStringRender`: This function is a method of the `defaultPrompt` object. It takes a `context` parameter and returns a string representation of the context. The returned string includes the source (file path or URL) and the text of the context.

External Functions:
None

Interaction Summary:
This module can be imported and used by other parts of the software application to provide a default prompt template for a sidekick assistant. Other modules can access the `defaultPrompt` object and use its properties and methods to customize the prompt behavior or retrieve the prompt templates.

Developer Questions:
- How can I customize the departments listed in the prompt?
- How can I change the label and value of the prompt?
- How can I modify the placeholder text?
- How can I change the system prompt template?
- How can I customize the user prompt template?
- How can I modify the rendering of the context string?
- Are there any other properties or methods that can be used to customize the prompt?