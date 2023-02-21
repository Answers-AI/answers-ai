import { Configuration, OpenAIApi } from 'openai';

const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  return new OpenAIApi(configuration);
};
export const openai = initializeOpenAI();
import { PineconeClient } from '@pinecone-database/pinecone';
import { pineconeQuery } from 'pineconeQuery';
export const pinecone = new PineconeClient();

export const generatePrompt = async ({ prompt, answers = [] }: any) => {
  // Send a request to the OpenAI API for embeddings based on query
  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: prompt
  });
  const embeddings = embeddingResponse.data?.data[0]?.embedding;

  const pineconeData = await pineconeQuery(embeddings);
  // const pineconeData = { matches: [] };

  const context = [
    ...answers?.filter((item: any) => !!item?.answer)?.map((item: any) => item?.answer),
    ...(!pineconeData?.matches
      ? []
      : pineconeData?.matches?.map((item: any) => item?.metadata?.text))
  ].join('\n');

  console.time('OpenAI->createCompletion');
  return {
    prompt: `Answer the following question based on the context provided,
                if you don't know the answer say "I don't know".
                When writing a issue id with the format {PROJECT-ID},
                wrap it with a tag <jira>.
                \n\nCONTEXT:\n${context}\n\n
                Question:\n${prompt}\n\nAnswer:\n`,
    pineconeData,
    context
  };
};
