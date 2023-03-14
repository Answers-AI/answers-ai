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

// TODO: Generate Prompt by feature flag
// TODO: Use templated prompts
export const generatePrompt = async ({ prompt, answers = [], filter = {} }: any, user?: any) => {
  // TODO: use embeddingLoader
  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: prompt
  });

  const hasDefaultFilter = Object.keys(filter).length;

  const embeddings = embeddingResponse.data?.data[0]?.embedding;
  // let filter = {};
  let pineconeData;
  let filteredData, unfilteredData;
  try {
    // Request openAI to extract params from the question
    if (false && !hasDefaultFilter) {
      const { data } = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `
          Return the filters as a valid JSON object included in the following question. All keys and values must be lowercase. Reply format can be like:
          { "project":"<project>", "status_category": "<status_category>" }
          Only return from the available fields if you know the value: project
          Question: ${prompt}`,
        max_tokens: 700,
        temperature: 0.1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }); // Get the recommended changes from the API response\
      let filtersResponse = data.choices[0].text;

      if (filtersResponse) {
        filtersResponse = filtersResponse?.replace(/\\n/g, '')?.trim();
        try {
          const regex = /{.*}/s;
          const match = filtersResponse.match(regex);
          console.log('Parsing AI Filter', { filtersResponse, match });
          if (match) {
            filter = JSON.parse(match[0]);
            console.log('Using AI Filter:', filter);
          }
        } catch (error) {
          console.log('PINECONE ERROR: Could not parse filters', error);
        }
      }
    }

    // TODO: Do multiple parallel queries for the prompt as different actors
    [filteredData, unfilteredData] = await Promise.all([
      Object.keys(filter).length
        ? pineconeQuery(embeddings, { filter, topK: 20 })
        : { matches: [] },
      !hasDefaultFilter ? pineconeQuery(embeddings, { topK: 20 }) : { matches: [] } // TODO: Use topK from config
    ]);
    // console.log('filteredData', JSON.stringify(filteredData.matches, null, 2));
    pineconeData = [...(unfilteredData?.matches || []), ...(filteredData?.matches || [])];
    // console.log('pineconeData', JSON.stringify(pineconeData, null, 2));
    // const pineconeData = { matches: [] };
  } catch (error: any) {
    console.log('Pinecone Error', error);
  }

  const context = [
    // ...answers
    //   ?.filter((item: any) => item?.answer || item?.prompt)
    //   ?.map((item: any) => `question:${item?.prompt}, answer:${item?.answer}`),
    ...(!pineconeData ? [] : pineconeData?.map((item: any) => item?.metadata?.text))
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
  // TODO: Need to be able to select this by feature flag

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
    filteredData,
    unfilteredData,
    filter,
    context
  };
};
