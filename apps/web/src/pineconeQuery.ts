import { PineconeClient } from '@pinecone-database/pinecone';
export const pinecone = new PineconeClient();

export const pineconeQuery = async (embeddings: number[]) => {
  console.log('PineconeQuery');
  console.time('PineconeQuery');
  try {
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY
    });

    const result = await pinecone.Index(process.env.PINECONE_INDEX).query({
      vector: embeddings,
      topK: 20,
      includeMetadata: true,
      namespace: 'jira'
    });

    console.timeEnd('PineconeQuery');
    return result.data;
  } catch (error) {
    console.timeEnd('PineconeQuery');
    console.error('PINECONE ERROR');
    throw error;
  }
};
