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
import { inngest } from './ingestClient';

export const generatePrompt = async ({ prompt, answers = [] }: any, user?: any) => {
  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: prompt
  });

  const embeddings = embeddingResponse.data?.data[0]?.embedding;

  let pineconeData;
  try {
    pineconeData = await pineconeQuery(embeddings);
    // const pineconeData = { matches: [] };
  } catch (error: any) {
    console.log('Pinecone Error', error);
  }

  const context = [
    // ...answers
    //   ?.filter((item: any) => !!item?.answer || !!item?.context)
    //   ?.map((item: any) => `${item?.answer}, ${item?.context}`),
    ...(!pineconeData?.matches
      ? []
      : pineconeData?.matches?.map((item: any) => item?.metadata?.text))
  ].join('\n');

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'answers/prompt.upserted',
    user,
    data: {
      prompt
    }
  });
  return {
    prompt: `
You are a helpful assistant. You will provide answers with related information.
Answer the following request based on the context provided.
I will give you the questions in the format: 
CONTEXT: {CONTEXT}
Question: {QUESTION}
                \n\nCONTEXT:\n${context}\n\n
                Question:\n${prompt}\n\nAnswer:{ANSWER} Sources:{sources}\n`,
    pineconeData,
    context
  };
};
