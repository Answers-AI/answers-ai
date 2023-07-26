Summary:
This code defines a TypeScript module that exports a variable named "sidekick". The "sidekick" object contains various properties and methods related to creating outbound sales emails. It includes information about the sidekick's departments, label, value, temperature, frequency, presence, maxCompletionTokens, placeholder, and various templates for system prompts, user prompts, and context string rendering.

Import statements:
- The code imports the "Sidekick" type from the "types" module. This type is used to define the type of the "sidekick" variable.

Script Summary:
The script defines an object named "sidekick" that represents a sales email outbound assistant. It includes properties for departments, label, value, temperature, frequency, presence, maxCompletionTokens, placeholder, and various template functions for system prompts, user prompts, and context string rendering.

Internal Functions:
- getSystemPromptTemplate(): This function returns a string that represents the system prompt template for the sales email outbound assistant. It includes information about the brand tone and voice.
- getUserPromptTemplate(query: string, context: any): This function returns a string that represents the user prompt template for the sales email outbound assistant. It includes guidelines for creating a good outbound sales email and also includes the query and context as parameters.
- contextStringRender(context: any): This function returns a string that represents the context string template for the sales email outbound assistant. It includes information about the blog content.

External Functions:
None

Interaction Summary:
This script can be imported and used by other parts of the software application to access the "sidekick" object and its properties and methods. It can be used to retrieve system and user prompt templates, as well as context string templates for creating outbound sales emails.

Developer Questions:
- How can I modify the departments, label, value, temperature, frequency, presence, maxCompletionTokens, and placeholder properties of the "sidekick" object?
- How can I customize the system prompt template, user prompt template, and context string template for the sales email outbound assistant?
- How can I use the "sidekick" object in other parts of the application to create outbound sales emails?