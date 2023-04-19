Summary:
This file contains code that defines two prompt templates for a text summarizer application. It imports prompt templates from a third-party library called 'langchain/prompts'.

Import statements:
- PromptTemplate, ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate from 'langchain/prompts'

Script Summary:
- The code defines two prompt templates: summarizeQAPrompt and summarizePrompt.
- summarizeQAPrompt is a ChatPromptTemplate that prompts the user to write an executive summary for a given input. It also provides some context for the task.
- summarizePrompt is a PromptTemplate that prompts the user to summarize a given input according to a given prompt.

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
- This file is part of a larger application that likely uses the prompt templates defined here to prompt users for input and generate summaries.
- Other parts of the application may import and use these prompt templates.

Developer Questions:
- What other parts of the application use these prompt templates?
- How are the generated summaries used in the application?
- Are there any other third-party libraries that this file interacts with?