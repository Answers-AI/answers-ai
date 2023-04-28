Summary:
This file exports two prompt templates, `summarizeQAPrompt` and `summarizePrompt`, which are used to prompt users to summarize content based on a given input. The prompts are constructed using various message templates imported from `langchain/prompts`.

Import statements:
The file imports four prompt templates, `PromptTemplate`, `ChatPromptTemplate`, `SystemMessagePromptTemplate`, and `HumanMessagePromptTemplate`, from the `langchain/prompts` module.

Script Summary:
The file exports two prompt templates, `summarizeQAPrompt` and `summarizePrompt`. `summarizeQAPrompt` is constructed using `ChatPromptTemplate.fromPromptMessages`, which takes an array of prompt messages as input. The prompt messages are constructed using `SystemMessagePromptTemplate.fromTemplate` and `HumanMessagePromptTemplate.fromTemplate`, which take a string as input and return a prompt message object. `summarizePrompt` is constructed using `PromptTemplate`, which takes a string template and an array of input variable names as input.

Internal Functions:
There are no internal functions in this file.

External Functions:
There are no external functions in this file.

Interaction Summary:
This file is used to prompt users to summarize content based on a given input. The prompt templates exported by this file could be used in various parts of the application where text summarization is required.

Developer Questions:
- What is the expected format of the input for the `summarizeQAPrompt` prompt?
- How can I customize the prompt messages for the `summarizeQAPrompt` prompt?
- How can I customize the template for the `summarizePrompt` prompt?

Known Issues and TODOs:
There are no known issues or TODOs for this file.