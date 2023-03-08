import { PineconeClient } from '@pinecone-database/pinecone';
import { Configuration, OpenAIApi } from 'openai';
export const pinecone = new PineconeClient();
const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  return new OpenAIApi(configuration);
};

export const openai = initializeOpenAI();

export const pineconeQuery = async (
  embeddings: number[],
  {
    filter,
    topK = 15,
    namespace = process.env.PINECONE_INDEX_NAMESPACE
  }: { filter?: any; topK?: number; namespace?: string }
) => {
  console.time('PineconeQuery');

  try {
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY
    });

    // TODO: Use metadata inferred from the question
    // TODO: Use topK
    const result = await pinecone.Index(process.env.PINECONE_INDEX).query({
      vector: embeddings,
      topK,
      filter,
      includeMetadata: true,
      // Sending the model id (combination of all models used)
      namespace
    });

    console.timeEnd('PineconeQuery');
    return result.data;
  } catch (error) {
    console.timeEnd('PineconeQuery');
    console.error('PINECONE ERROR');
    throw error;
  }
};
