Summary:
This file exports a function called `summarizeAI` which takes in a string input and a prompt, and uses OpenAI's API to generate a summary of the input text based on the prompt. The input text is split into smaller chunks using a text splitter, and each chunk is processed separately to generate a summary. The summaries are then combined and returned as a single string.

Import statements:
- `RecursiveCharacterTextSplitter` from `langchain/text_splitter`: A class that splits text into smaller chunks based on a specified character limit.
- `randomUUID` from `crypto`: A function that generates a random UUID.
- `openai` from `./openai/client`: An object that contains functions for interacting with OpenAI's API.
- `Document` from `langchain/dist/document`: A class that represents a document of text.

Script Summary:
- Defines two constants for OpenAI models: `summarizeModel` and `finalSummaryModel`.
- Exports a function called `summarizeAI` that takes in an object with properties `input`, `prompt`, `chunkSize`, `maxTokens`, and `id`.
- The function splits the input text into smaller chunks using `RecursiveCharacterTextSplitter`, and generates a summary for each chunk using OpenAI's API.
- The summaries are combined into a single string and returned.

Internal Functions:
- `sleep`: A function that returns a promise that resolves after a specified number of milliseconds.
- `timeout`: A function that returns a promise that rejects with an error after a specified number of milliseconds.

External Functions:
- `summarizeAI`: A function that takes in an object with properties `input`, `prompt`, `chunkSize`, `maxTokens`, and `id`, and returns a promise that resolves with a string.

Interaction Summary:
This file interacts with OpenAI's API to generate summaries of text. It also uses a text splitter to split the input text into smaller chunks.

Developer Questions:
- What are the maximum values for `chunkSize` and `maxTokens`?
- What happens if the OpenAI API returns an error?
- How can I test this function with different input and prompt values?

Known Issues and TODOs:
- None