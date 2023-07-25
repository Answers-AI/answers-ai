Template:

Summary:
This code is a TypeScript module that exports an object named `promptCreator`. The purpose of this module is to provide a sidekick object that can be used in a broader software application. The `promptCreator` object contains various properties and methods related to generating prompts for an AI system. It includes functions for getting system prompt templates, user prompt templates, and rendering context strings.

Import statements:
- `Sidekick` from 'types': This import statement imports the `Sidekick` type from a module named 'types'. The `Sidekick` type is likely a custom type defined elsewhere in the application.

Script Summary:
The script exports a single object named `promptCreator`. This object has the following properties and methods:
- `departments`: An array of strings representing different departments.
- `label`: A string representing the label of the prompt assistant.
- `value`: A string representing the value of the prompt assistant.
- `temperature`: A number representing the temperature of the prompt assistant.
- `placeholder`: A string representing the placeholder text for the prompt assistant.
- `getSystemPromptTemplate`: A function that returns a string representing a system prompt template.
- `getUserPromptTemplate`: A function that returns a string representing a user prompt template.
- `contextStringRender`: A function that takes a context object as input and returns a string representing the rendered context.

Internal Functions:
- `getSystemPromptTemplate()`: This function returns a string representing a system prompt template. It provides instructions for the user on how to improve a prompt through an iterative process.
- `getUserPromptTemplate(query, context)`: This function takes a query string and a context object as input and returns a string representing a user prompt template. It includes the query and context information for the user to iterate on the prompt.
- `contextStringRender(context)`: This function takes a context object as input and returns a string representing the rendered context. It includes the file path or URL and the text of the context.

External Functions:
None

Interaction Summary:
This module can be imported and used in other parts of the software application to generate prompt templates for an AI system. The `promptCreator` object provides methods for getting system and user prompt templates, as well as rendering context strings. Other components can use these methods to interact with the prompt assistant functionality.

Developer Questions:
- What is the purpose of the `Sidekick` type and where is it defined?
- How can I customize the departments array?
- Can I modify the system and user prompt templates?
- How should I use the `contextStringRender` function?
- Are there any additional methods or properties that can be added to the `promptCreator` object?