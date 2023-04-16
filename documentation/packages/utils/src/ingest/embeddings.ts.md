Filepath: packages/utils/src/ingest/embeddings.ts
Overview: Summary:
This file is responsible for processing vectors that have been upserted into the Pinecone index. It uses the OpenAI API to create embeddings for each vector, and then writes the resulting data to the Pinecone index.

Import statements:
- PineconeClient: A client for interacting with the Pinecone API.
- EventVersionHandler: A type for defining event handlers.
- PineconeVector: A type for defining Pinecone vectors.
- OpenAI: A client for interacting with the OpenAI API.

Script Summary:
- Creates instances of PineconeClient and OpenAI.
- Defines an event handler for the 'pinecone/vectors.upserted' event.
- Extracts vectors from the event data.
- Uses OpenAI to create embeddings for each vector.
- Writes the resulting data to the Pinecone index.

Internal Functions:
- None.

External Functions:
- processVectorsUpserted: An event handler for the 'pinecone/vectors.upserted' event. Takes an object with a 'vectors' property, which is an array of PineconeVector objects. Returns nothing.

Interaction Summary:
This file interacts with the Pinecone and OpenAI APIs to process vectors and write them to the Pinecone index. It is likely used in conjunction with other files to handle other events and perform other tasks related to the application's functionality.

Developer Questions:
- What other events does this file handle?
- What other tasks does this file perform?
- How are the Pinecone and OpenAI clients configured?
- What is the structure of a PineconeVector object?
- What is the structure of the data written to the Pinecone index?

