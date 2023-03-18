import { Configuration, OpenAIApi } from 'openai';

const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  return new OpenAIApi(configuration);
};
import { PineconeClient } from '@pinecone-database/pinecone';
import { pineconeQuery } from '@web/pineconeQuery';
import { inngest } from './ingestClient';
import { Chat } from 'db/generated/prisma-client';
import { AnswersFilters, Message } from 'types';
import { PromptLayerOpenAI, OpenAI } from 'langchain/llms';
import { loadQAMapReduceChain } from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export const openai = initializeOpenAI();
export const pinecone = new PineconeClient();

const model = process.env.PROMPT_LAYER_API_KEY
  ? new PromptLayerOpenAI({
      temperature: 0,
      promptLayerApiKey: process.env.PROMPT_LAYER_API_KEY
    })
  : new OpenAI({ temperature: 0 });

const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 3000 });
const qaChain = loadQAMapReduceChain(model);

export const generatePrompt = async (
  {
    chat,
    prompt,
    messages = [],
    filters = {}
  }: {
    chat: Chat;
    prompt: string;
    messages: Message[];
    filters: AnswersFilters;
  },
  user?: any
) => {
  if (user)
    await inngest.send({
      v: '1',
      ts: new Date().valueOf(),
      name: 'answers/prompt.upserted',
      user,
      data: {
        prompt,
        chat
      }
    });

  // TODO: Use history to generate a more accurate question to search for vectors
  const history = messages
    ?.filter((item: any) => item?.content)
    ?.map((item: any) => `${item?.content}`)
    ?.join('\n');

  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: prompt?.toLowerCase()
  });

  const hasDefaultFilter = Object.keys(filters).length;

  const embeddings = embeddingResponse.data?.data[0]?.embedding;
  let pineconeData;

  try {
    // Request openAI to extract params from the question
    // if (!hasDefaultFilter) {
    //   const { data } = await openai.createCompletion({
    //     model: 'text-davinci-003',
    //     prompt: `
    //       Return the filters as a valid JSON object included in the following question. All keys and values must be lowercase. Reply format can be like:
    //       { "project":"<project>", "status_category": "<status_category>" }
    //       Only return from the available fields if you know the value: project
    //       Question: ${prompt}`,
    //     max_tokens: 700,
    //     temperature: 0.1,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0
    //   }); // Get the recommended changes from the API response\
    //   let filtersResponse = data.choices[0].text;

    //   if (filtersResponse) {
    //     filtersResponse = filtersResponse?.replace(/\\n/g, '')?.trim();
    //     try {
    //       const regex = /{.*}/s;
    //       const match = filtersResponse.match(regex);
    //       console.log('Parsing AI Filter', { filtersResponse, match });
    //       if (match) {
    //         filters = JSON.parse(match[0]);
    //         console.log('Using AI Filter:', filters);
    //       }
    //     } catch (error) {
    //       console.log('PINECONE ERROR: Could not parse filters', error);
    //     }
    //   }
    // }

    // TODO: Do multiple parallel queries for each different data source by filters
    const pineconeVectors = await Promise.all([
      Object.keys(filters).length
        ? pineconeQuery(embeddings, { filters, topK: 5 })
        : { matches: [] },
      !hasDefaultFilter ? pineconeQuery(embeddings, { topK: 5 }) : { matches: [] } // TODO: Use topK from config
    ]);
    // TODO: Filter pinecone data by threshold
    pineconeData = pineconeVectors?.map((v) => v?.matches || []).flat();
  } catch (error: any) {
    console.log('Pinecone Error', error);
  }

  const context = [
    `${history}`,
    ...(!pineconeData ? [] : pineconeData?.map((item: any) => item?.metadata?.text))
  ].join(' <SEP> ');

  let summary = context;

  if (context) {
    const contextDocs = await textSplitter.createDocuments([context]);
    try {
      if (contextDocs.length > 1) {
        console.time('Summarization Chain');
        const response = await qaChain.call({
          input_documents: contextDocs,
          question: prompt
        });
        summary = response.text;
        console.timeEnd('Summarization Chain');
      }
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
  return {
    prompt: `${summary ? `CONTEXT: ${summary}` : ''} ${prompt}`,
    messages,
    pineconeData,
    filters,
    context,
    summary
  };
};
