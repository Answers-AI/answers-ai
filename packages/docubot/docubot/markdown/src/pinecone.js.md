Summary:
This file is responsible for processing markdown files and creating embeddings for them using OpenAI's text-embedding-ada-002 model. It then upserts these embeddings to Pinecone, a vector database service. 

Import statements:
- dotenv: loads environment variables from a .env file
- fs: provides an API for interacting with the file system
- path: provides utilities for working with file and directory paths
- Configuration, OpenAIApi: from the openai package, used for interacting with OpenAI's API
- PineconeClient: from the @pinecone-database/pinecone package, used for interacting with Pinecone's API
- GPT3Tokenizer: from the gpt3-tokenizer package, used for tokenizing text
- countTokensRecursively: a custom function for counting the number of tokens in a file

Script Summary:
- Copies the .docubotrc file to the local project if it does not exist
- Loads the configuration from the .docubotrc file
- Initializes Pinecone client and GPT3 tokenizer
- Defines the main function, which processes markdown files, creates embeddings, and upserts them to Pinecone
- Defines helper functions for getting all markdown files in a directory and processing embeddings
- If this file is run directly, it calls the main function

Internal Functions:
- getAllFiles: recursively gets all markdown files in a directory and returns them in an array
  - Parameters: folderPath (string), fileList (array)
  - Returns: fileList (array)
- processEmbeddings: creates embeddings for a batch of markdown files using OpenAI's text-embedding-ada-002 model
  - Parameters: files (array)
  - Returns: embeddingBatches (array)
- upsertEmbeddingsToPinecone: upserts embeddings to Pinecone
  - Parameters: embeddings (array), index (object)
  - Returns: none
- processMarkdownFiles: processes markdown files, creates embeddings, and upserts them to Pinecone
  - Parameters: folderPath (string), index (object)
  - Returns: none

External Functions:
- main: the main function that calls processMarkdownFiles
  - Parameters: directory (string)
  - Returns: none
- save: an alias for processMarkdownFiles
  - Parameters: folderPath (string), index (object)
  - Returns: none

Interaction Summary:
This file interacts with the following:
- The .docubotrc file, which contains configuration information
- OpenAI's API, which is used to create embeddings
- Pinecone's API, which is used to upsert embeddings
- Other files in the application, which may call the main function in this file

Developer Questions:
- What is the format of the .docubotrc file?
- How do I obtain an OpenAI API key?
- How do I obtain a Pinecone API key?
- What is the text-embedding-ada-002 model?
- How does the GPT3Tokenizer work?
- How are embeddings stored in Pinecone?
- How do I use the main function in this file in other parts of the application?