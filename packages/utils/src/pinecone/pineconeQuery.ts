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
    console.time('[PineconeQuery]' + JSON.stringify({ filter, topK, namespace }));
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT!,
      apiKey: process.env.PINECONE_API_KEY!
    });
    let filterOverrides: any = {};
    let namespaceOverrides: string;
    
    filterOverrides = {
      source: 'airtable',
    };
    namespaceOverrides = 'airtable-if';


    let namespaceOverride = namespace;
    let filterOverride = filter;

    namespaceOverride = 'impossiblefoods';
    filterOverride = {
      datasource: 'airtable',
    }


    let namespaceOverride = namespace;

    namespaceOverride = 'docstesting';

    const result = await pinecone.Index(process.env.PINECONE_INDEX!).query({
      vector: embeddings,
      topK,
      filter: filterOverride,
      includeMetadata: true,
      namespace: namespaceOverride
    });
    console.timeEnd('[PineconeQuery]' + JSON.stringify({ filterOverride, topK, namespace }));
    console.log('[PineconeQuery]', result?.data?.matches?.length);
    return result?.data;
  } catch (error) {
    console.timeEnd('[PineconeQuery]' + JSON.stringify({ filter, topK, namespace }));
    throw error;
  }
};
