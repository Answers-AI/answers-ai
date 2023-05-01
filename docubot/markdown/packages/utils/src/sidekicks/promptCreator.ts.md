Summary:
This file exports an object named `promptCreator` which contains various properties and functions related to creating prompts. It is a part of a larger application and is dependent on the `Sidekick` type.

Import statements:
The file imports the `Sidekick` type from the `types` module.

Script Summary:
The `promptCreator` object contains the following properties:
- `label`: A string that represents the label of the prompt assistant.
- `value`: A string that represents the value of the prompt assistant.
- `placeholder`: A string that represents the placeholder text of the prompt assistant.
- `getSystemPromptTemplate`: A function that returns a string representing the system prompt template.
- `getUserPromptTemplate`: A function that returns a string representing the user prompt template.
- `contextStringRender`: A function that returns a string representing the context string render.

Internal Functions:
- `getSystemPromptTemplate`: This function takes no parameters and returns a string representing the system prompt template.
- `getUserPromptTemplate`: This function takes two parameters, `query` and `context`, and returns a string representing the user prompt template.
- `contextStringRender`: This function takes one parameter, `context`, and returns a string representing the context string render.

External Functions:
None

Interaction Summary:
This file exports an object that can be used by other parts of the application to create prompts. The `getUserPromptTemplate` function can be used to generate a user prompt template based on a query and context. The `contextStringRender` function can be used to generate a context string render based on a context.

Developer Questions:
- What is the purpose of the `promptCreator` object?
- How is the `getUserPromptTemplate` function used in the application?
- What is the `Sidekick` type and where is it defined?

Known Issues and TODOs:
None.