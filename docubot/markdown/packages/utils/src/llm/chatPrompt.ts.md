Summary:
This file contains code for creating chat prompts for a larger application. It imports prompt templates from a third-party library and exports various chat prompts.

Import statements:
The file imports the following prompt templates from the 'langchain/prompts' library:
- ChatPromptTemplate
- HumanMessagePromptTemplate
- SystemMessagePromptTemplate

Script Summary:
The file exports four chat prompts:
- assistantPrompt: a prompt for a friendly AI assistant
- intentionPrompt: a prompt for the user to introduce themselves
- chatPrompt: a combination of the above prompts for a chat conversation
- rawPrompt: a variation of chatPrompt that includes a system message with context information

Internal Functions:
There are no internal functions in this file.

External Functions:
There are no external functions in this file.

Interaction Summary:
This file provides chat prompts that can be used in the larger application. These prompts can be used to initiate conversations with users and gather information from them. The prompts can be customized by changing the text in the prompt templates.

Developer Questions:
- What is the purpose of the larger application that uses these chat prompts?
- How can the chat prompts be customized to fit the needs of the application?
- Are there any other third-party libraries that this file interacts with?