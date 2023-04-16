Filepath: packages/utils/src/summarizeAI.ts
Overview: Summary:
This file contains a function called `summarizeAI` that uses OpenAI's language model to summarize text input. The function splits the input into smaller chunks, generates summaries for each chunk, and then combines the summaries into a final summary. The file also imports several dependencies, including the `RecursiveCharacterTextSplitter` from `langchain/text_splitter`, `randomUUID` from `crypto`, and `openai` from a custom `openai/client` module.

Import statements:
- `RecursiveCharacterTextSplitter` from `langchain/text_splitter`: A class that splits text into smaller chunks based on a specified character limit.
- `randomUUID` from `crypto`: A function that generates a random UUID.
- `openai` from `./openai/client`: A custom module that provides a client for OpenAI's API.
- `Document` from `langchain/dist/document`: A class that represents a document of text.

Script Summary:
The `summarizeAI` function takes in an object with several parameters, including the input text, a prompt for the summary, the chunk size, and the maximum number of tokens to use in the summary. The function first splits the input text into smaller chunks using the `RecursiveCharacterTextSplitter` class. It then generates a summary for each chunk using OpenAI's API and combines the summaries into a final summary. If the final summary is still too long, the function recursively calls itself with the summary as the new input text until the summary is short enough.

Internal Functions:
- `sleep(ms: number): Promise<void>`: A function that returns a promise that resolves after a specified number of milliseconds.
- `timeout(ms: number): Promise<never>`: A function that returns a promise that rejects with an error after a specified number of milliseconds.

External Functions:
- `summarizeAI({ input, prompt, chunkSize = 4000, maxTokens = 1000, id }: { input: string; prompt?: string; chunkSize?: number; max_recurse?: number; maxTokens?: number; id?: string; }): Promise<string>`: The main function that generates a summary for the input text. It takes in an object with several parameters, including the input text, a prompt for the summary, the chunk size, and the maximum number of tokens to use in the summary. It returns a promise that resolves with the final summary.

Interaction Summary:
This file interacts with OpenAI's API through a custom `openai/client` module. It also uses the `RecursiveCharacterTextSplitter` class from `langchain/text_splitter` to split the input text into smaller chunks. The `summarizeAI` function could potentially be used in other parts of the application that require text summarization.

Developer Questions:
- How does the `RecursiveCharacterTextSplitter` class work?
- What is the format of the input text expected by the `summarizeAI` function?
- How does the `openai/client` module interact with OpenAI's API?
- What is the maximum number of tokens that can be used in a summary?
- How does the `summarizeAI` function handle errors from OpenAI's API?

