Summary:
This file contains a function called "processVectorsUpserted" that handles an event triggered by the Pinecone service. It processes vectors of text data, creates embeddings using the OpenAI service, and writes the resulting data to the Pinecone index.

Import statements:
- PineconeClient: a custom client for interacting with the Pinecone service
- EventVersionHandler: a custom type for defining event handlers
- PineconeVector: a custom type for defining vectors of text data
- OpenAI: a custom client for interacting with the OpenAI service

Script Summary:
- Creates instances of the PineconeClient and OpenAI classes
- Defines a function called "processVectorsUpserted" that handles an event triggered by the Pinecone service
- Processes vectors of text data by creating embeddings using the OpenAI service
- Writes the resulting data to the Pinecone index

Internal Functions:
- None

External Functions:
- processVectorsUpserted: a function that handles an event triggered by the Pinecone service. It processes vectors of text data, creates embeddings using the OpenAI service, and writes the resulting data to the Pinecone index.

Interaction Summary:
- This file interacts with the Pinecone and OpenAI services to process and store text data.
- It may be called by other parts of the application when the "pinecone/vectors.upserted" event is triggered.

Developer Questions:
- What is the purpose of the Pinecone and OpenAI services?
- How are the PineconeClient and OpenAI classes implemented?
- What is the structure of the "vectors" object passed to the "processVectorsUpserted" function?
- How is the "vectorData" object constructed and what does it contain?
- What is the purpose of the "DISABLE_EMBEDDING" flag and how is it used?
- What is the format of the data stored in the Pinecone index?