Summary:
This code defines a TypeScript module that exports a variable named "sidekick". The "sidekick" variable is an object that represents a script writer for TikTok videos. It contains various properties and methods related to generating prompts and templates for script writing.

Import statements:
- The code imports the "Sidekick" type from the "types" module. This type is used to define the type of the "sidekick" variable.

Script Summary:
The script defines an object named "sidekick" that represents a TikTok script writer. It has properties such as "departments", "label", "value", and "placeholder" that provide information about the script writer. It also has methods like "getSystemPromptTemplate", "getUserPromptTemplate", and "contextStringRender" that generate prompts and templates for script writing.

Internal Functions:
- getSystemPromptTemplate(user: any): This function takes a "user" parameter and returns a string template for the system prompt. The template includes a description of the AI assistant's purpose.
- getUserPromptTemplate(query: string, context: string): This function takes a "query" and "context" parameter and returns a string template for the user prompt. The template includes the user's query, context, and examples of script writing.
- contextStringRender(context: string): This function takes a "context" parameter and returns an empty string. It is not currently implemented and does not have any functionality.

External Functions:
- None

Interaction Summary:
This script represents a specific component within a broader software application. It provides a script writer for TikTok videos. Other parts of the application can import and use the "sidekick" object to generate prompts and templates for script writing.

Developer Questions:
- How can I modify the departments list?
- Can I change the label and value properties?
- How can I customize the system and user prompt templates?
- What is the purpose of the contextStringRender function?
- How can I extend the functionality of the script writer?