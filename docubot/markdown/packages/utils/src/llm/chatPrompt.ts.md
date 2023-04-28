Summary:
This file contains code that exports four different prompt templates that are used in the larger application. These prompt templates are used to prompt users for input and provide context for the AI assistant.

Import statements:
The file imports three different prompt templates from a module called "langchain/prompts". It also imports two different prompt templates from a module called "langchain/agents". However, the "ZeroShotAgent" prompt template is commented out and not used in the code.

Script Summary:
The script exports four different prompt templates: "assistantPrompt", "intentionPrompt", "chatPrompt", and "rawPrompt". The "assistantPrompt" is used to introduce the AI assistant to the user and provide context for its responses. The "intentionPrompt" is used to prompt the user to introduce themselves. The "chatPrompt" is a combination of the "assistantPrompt", "intentionPrompt", and a prompt for the user's input. The "rawPrompt" is similar to the "chatPrompt", but it also includes a prompt for the user to use a specific context as part of their knowledge.

Internal Functions:
There are no internal functions in this file.

External Functions:
There are no external functions in this file.

Interaction Summary:
This file is used to provide prompt templates that are used in the larger application to prompt users for input and provide context for the AI assistant. These prompt templates are used in various parts of the application where user input is required.

Developer Questions:
- What other prompt templates are available in the "langchain/prompts" module?
- Why is the "ZeroShotAgent" prompt template commented out?
- How are these prompt templates used in the larger application?

Known Issues and TODOs:
There are no known issues or TODOs for this file.