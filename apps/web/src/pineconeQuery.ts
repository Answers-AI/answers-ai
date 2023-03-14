import { PineconeClient } from '@pinecone-database/pinecone';
import { Configuration, OpenAIApi } from 'openai';
import { AnswersFilters } from 'types';
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
    filters,
    topK = 15,
    namespace = process.env.PINECONE_INDEX_NAMESPACE
  }: { filters?: AnswersFilters; topK?: number; namespace?: string }
) => {
  console.time('PineconeQuery:' + JSON.stringify({ filters, topK, namespace }));

  try {
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY
    });

    // TODO: Use metadata inferred from the question
    // TODO: Use topK
    // TODO: Parse filters into pinecone filter
    // TODO: Generate the model filters by combining all inputs
    const filter = filters;
    const result = await pinecone.Index(process.env.PINECONE_INDEX).query({
      vector: embeddings,
      topK,
      filter,
      includeMetadata: true,
      namespace
    });

    console.timeEnd('PineconeQuery:' + JSON.stringify({ filters, topK, namespace }));
    return result.data;
  } catch (error) {
    console.timeEnd('PineconeQuery:' + JSON.stringify({ filters, topK, namespace }));
    console.error('PINECONE ERROR');
    throw error;
  }
};
