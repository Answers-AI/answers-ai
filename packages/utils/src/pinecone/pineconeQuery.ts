import { Configuration, OpenAIApi } from 'openai';
import { AnswersFilters } from 'types';
import { PineconeClient, QueryRequest } from '@pinecone-database/pinecone';
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
    topK = 20,
    namespace = process.env.PINECONE_INDEX_NAMESPACE
  }: { filter?: any; topK?: number; namespace?: string }
) => {
  // TODO: Use metadata inferred from the question
  try {
    console.time('[PineconeQuery]' + JSON.stringify({ filter, topK, namespace }));
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT!,
      apiKey: process.env.PINECONE_API_KEY!
    });

    const queryRequest: QueryRequest = {
      vector: embeddings,
      topK,
      filter,
      includeValues: true,
      includeMetadata: true,
      namespace
    };

    const pinconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);
    //@ts-ignore-next-line
    const result = await pinconeIndex.query(queryRequest);
    // console.log('========result', result);
    console.timeEnd('[PineconeQuery]' + JSON.stringify({ filter, topK, namespace }));
    console.log('[PineconeQuery]', process.env.PINECONE_INDEX, result);
    return result?.data;
  } catch (error) {
    console.timeEnd('[PineconeQuery]' + JSON.stringify({ filter, topK, namespace }));
    throw error;
  }
};
