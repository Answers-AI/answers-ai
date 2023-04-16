Filepath: packages/utils/src/llm/summarizePrompt.ts
Overview: Summary:
This file contains code that exports two prompt templates used for text summarization. The first template summarizes a question and answer prompt, while the second template summarizes a given input according to a prompt.

Import statements:
The file imports four prompt templates from the 'langchain/prompts' package.

Script Summary:
The file exports two prompt templates: summarizeQAPrompt and summarizePrompt. summarizeQAPrompt is a ChatPromptTemplate that summarizes a question and answer prompt. It contains a SystemMessagePromptTemplate and a HumanMessagePromptTemplate. summarizePrompt is a PromptTemplate that summarizes a given input according to a prompt.

Internal Functions:
There are no internal functions in this file.

External Functions:
There are no external functions in this file.

Interaction Summary:
This file interacts with the 'langchain/prompts' package to import four prompt templates. It is likely that this file is used in conjunction with other files in the 'utils' package to provide text summarization functionality to the larger application.

Developer Questions:
- What other files in the 'utils' package interact with this file?
- How are the prompt templates used in the larger application?
- Are there any other third-party packages that this file interacts with?

