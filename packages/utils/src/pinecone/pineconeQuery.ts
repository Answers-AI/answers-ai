import { Configuration, OpenAIApi } from 'openai';
import { AnswersFilters } from 'types';
import { PineconeClient } from '@pinecone-database/pinecone';
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
    console.log('HELLO PINECONE QUERY', process.env.PINECONE_INDEX);
    // console.time(`[PineconeQuery: Starting ${process.env.PINECONE_INDEX}]` + JSON.stringify({ filter, topK, namespace }));
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT!,
      apiKey: process.env.PINECONE_API_KEY!
    });

    console.log('[PineconeQuery]', embeddings, filter);
    const filterOverride = {
      $or: [
        { datasource: 'docubot-answers-ai-v0.0.0' },
        // { datasource: 'docubot-docubot-v0.1.11' },
        // { domain: { $in: ['https://docs.pinecone.io'] } }
      ]
    };
    const result = await pinecone.Index(process.env.PINECONE_INDEX!).query({
      vector: embeddings,
      topK,
      filter: filterOverride || filter,
      includeMetadata: true,
      namespace
    });
    // console.timeEnd('[PineconeQuery]' + JSON.stringify({ filter, topK, namespace }));
    console.timeEnd(
      '[PineconeQuery: Filter Used]' + JSON.stringify({ filterOverride, topK, namespace })
    );
    console.log('[PineconeQuery: Results]', result?.data?.matches?.length);
    return result?.data;
  } catch (error) {
    console.timeEnd('[PineconeQuery: ERROR] ' + JSON.stringify({ filter, topK, namespace }));
    throw error;
  }
};
