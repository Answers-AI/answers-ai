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
    filters,
    topK = 20,
    namespace = process.env.PINECONE_INDEX_NAMESPACE
  }: { filters?: AnswersFilters; topK?: number; namespace?: string }
) => {
  // TODO: Use metadata inferred from the question
  // TODO: Use topK
  // TODO: Parse filters into pinecone filter
  // TODO: Generate the model filters by combining all inputs
  const filter: any = {};
  if (filters?.models) {
    filter.model = {
      $in: Object.keys(filters?.models)
        ?.map((model) => {
          return filters?.models?.[model];
        })
        .flat()
    };
  }

  filter.project = { $in: filters?.projectName?.map((name) => name.toLowerCase()) };

  filter.status_category = { $in: filters?.status_category?.map((name) => name.toLowerCase()) };

  filter.assignee_name = { $in: filters?.assignee_name?.map((name) => name.toLowerCase()) };

  filter.cleanedUrl = { $in: [filters?.cleanedUrl] };

  filter.url = { $in: filters?.url?.map((url) => url.toLowerCase()) ?? [] };

  try {
    console.time('PineconeQuery:' + JSON.stringify({ filter, topK, namespace }));
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY
    });
    const result = await pinecone.Index(process.env.PINECONE_INDEX).query({
      vector: embeddings,
      topK,
      filter,
      includeMetadata: true,
      namespace
    });
    console.timeEnd('PineconeQuery:' + JSON.stringify({ filter, topK, namespace }));
    console.log('PINECONE RESULT', result?.data?.matches?.length);
    return result?.data;
  } catch (error) {
    console.timeEnd('PineconeQuery:' + JSON.stringify({ filter, topK, namespace }));
    console.error('PINECONE ERROR');
    throw error;
  }
};
