Summary:
This file exports an object named "coding" which is of type "Sidekick". It contains properties such as label, value, placeholder, and functions such as getSystemPromptTemplate, getUserPromptTemplate, and contextStringRender. These properties and functions are used to provide assistance to users who need help with coding-related tasks.

Import statements:
This file imports the "Sidekick" type from the "types" module.

Script Summary:
This script exports an object named "coding" which is of type "Sidekick". The "Sidekick" type is defined in the "types" module. The "coding" object contains properties such as label, value, placeholder, and functions such as getSystemPromptTemplate, getUserPromptTemplate, and contextStringRender. These properties and functions are used to provide assistance to users who need help with coding-related tasks.

Internal Functions:
- getSystemPromptTemplate: This function takes a user object as a parameter and returns a string that describes the user as a code assistant who specializes in building JavaScript applications with OpenAI.
- getUserPromptTemplate: This function takes a query and context object as parameters and returns a string that provides instructions to the user on how to provide context and ask questions related to their coding problem. It also outlines the use cases for which end-to-end tests need to be created and suggests questions that the user can ask to provide more information. The function ends by asking the user to cite their sources in a list.
- contextStringRender: This function takes a context object as a parameter and returns a string that provides a formatted representation of the context object.

External Functions:
None

Interaction Summary:
This file does not interact with the rest of the application directly. However, it can be used by other parts of the application to provide assistance to users who need help with coding-related tasks.

Developer Questions:
- What is the purpose of the "Sidekick" type?
- How is the "coding" object used in the rest of the application?
- What are some examples of use cases for the "coding" object?

Known Issues and TODOs:
None