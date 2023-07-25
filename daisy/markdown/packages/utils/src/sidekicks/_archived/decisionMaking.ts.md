Summary:
This code defines a TypeScript module that exports a variable named "sidekick". The "sidekick" variable is an object that represents a decision-making AI assistant. It contains various properties and methods related to decision-making.

Import statements:
- The code imports the "Sidekick" type from the "types" module. This type is used to define the type of the "sidekick" variable.

Script Summary:
The script defines an object named "sidekick" that represents a decision-making AI assistant. It has properties such as "departments", "label", "value", "placeholder", and methods such as "getSystemPromptTemplate", "getUserPromptTemplate", and "contextStringRender".

Internal Functions:
- getSystemPromptTemplate(user): This function takes a "user" parameter and returns a string template that represents a system prompt for the AI assistant. It includes a description of the assistant's purpose.
- getUserPromptTemplate(query, context): This function takes "query" and "context" parameters and returns a string template that represents a user prompt for the AI assistant. It includes instructions for the user on how to evaluate decisions and provide information.
- contextStringRender(context): This function takes a "context" parameter and returns an empty string. It is not currently implemented and does not have any functionality.

External Functions:
- None

Interaction Summary:
This script represents a decision-making AI assistant that can be used within a broader software application. It provides system and user prompts related to decision-making and can be integrated into a user interface or conversational interface.

Developer Questions:
- How can I modify the system prompt template?
- How can I modify the user prompt template?
- How can I add additional functionality to the AI assistant?
- How can I integrate the AI assistant into a user interface or conversational interface?
- What is the purpose of the "contextStringRender" function and how can I implement it?