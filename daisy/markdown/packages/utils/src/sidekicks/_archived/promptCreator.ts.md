Template:

Summary:
This code is a TypeScript module that exports an object named `promptCreator`. It is part of a broader software application and serves as a configuration object for a prompt assistant feature. The `promptCreator` object contains various properties and methods related to generating prompts for an AI system.

Import statements:
- `Sidekick` from 'types': This import statement brings in the `Sidekick` type from the 'types' module. The `Sidekick` type is likely a custom type defined elsewhere in the application.

Script Summary:
The `promptCreator` object is defined as a constant using the `const` keyword. It has the following properties:
- `departments`: An array of strings representing different departments.
- `label`: A string representing the label or name of the prompt assistant.
- `value`: A string representing the value associated with the prompt assistant.
- `temperature`: A number representing the temperature setting for generating prompts.
- `placeholder`: A string representing the placeholder text for the prompt assistant.
- `getSystemPromptTemplate`: A function that returns a string representing a system prompt template.
- `getUserPromptTemplate`: A function that returns a string representing a user prompt template.
- `contextStringRender`: A function that returns a string representing the rendering of a context object.

Internal Functions:
- `getSystemPromptTemplate`: This function returns a string representing a system prompt template. It does not take any parameters and always returns the same template string.

External Functions:
- `getUserPromptTemplate`: This function takes two parameters: `query` (a string representing user input) and `context` (an object representing additional context information). It returns a string representing a user prompt template with the provided query and context.

- `contextStringRender`: This function takes one parameter: `context` (an object representing context information). It returns a string representing the rendering of the context object.

Interaction Summary:
The `promptCreator` object can be imported and used by other modules in the application. It provides methods for generating system and user prompt templates, as well as rendering context information. Other parts of the application can use these methods to interact with the prompt assistant feature.

Developer Questions:
- What is the purpose of the `Sidekick` type and where is it defined?
- How is the `promptCreator` object used in other parts of the application?
- Are there any other dependencies or modules that need to be imported for this code to work correctly?
- Are there any potential issues or bugs in the code that need to be addressed?
- Are there any additional features or functionalities that can be added to the `promptCreator` object?