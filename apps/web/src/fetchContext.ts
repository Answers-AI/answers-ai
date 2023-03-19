import { Configuration, OpenAIApi } from 'openai';

const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  return new OpenAIApi(configuration);
};
import { PineconeClient } from '@pinecone-database/pinecone';
import { pineconeQuery } from '@web/pineconeQuery';
import { Chat } from 'db/generated/prisma-client';
import { AnswersFilters, Message } from 'types';
import { PromptLayerOpenAI, OpenAI } from 'langchain/llms';
import { loadQAMapReduceChain } from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import OpenAIClient from 'utils/dist/openai/openai';
import { summarizeChain } from './llm/chains';

const openai = new OpenAIClient();
export const pinecone = new PineconeClient();

const model = process.env.PROMPT_LAYER_API_KEY
  ? new PromptLayerOpenAI({
      temperature: 0,
      promptLayerApiKey: process.env.PROMPT_LAYER_API_KEY
    })
  : new OpenAI({ temperature: 0 });

const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const qaChain = loadQAMapReduceChain(model);

export const fetchContext = async ({
  chat,
  prompt,
  messages = [],
  filters = {}
}: {
  chat: Chat;
  prompt: string;
  messages: Message[];
  filters: AnswersFilters;
}) => {
  const hasDefaultFilter = Object.keys(filters).length;
  // const history = messages
  //   ?.filter((item: any) => item?.content)
  //   ?.map((item: any) => `${item?.content}`)
  //   ?.join('\n');

  // TODO: Use history to generate a more accurate question to search for vectors
  const promptEmbedding = await openai.createEmbedding({
    input: prompt?.toLowerCase(),
    model: 'text-embedding-ada-002'
  });

  // if (!hasDefaultFilter) {
  //   filters = await extractFilters(prompt, filters);
  // }

  // TODO: Do multiple parallel queries for each different data source by filters
  const pineconeData = await Promise.all([
    Object.keys(filters).length
      ? pineconeQuery(promptEmbedding, { filters, topK: 5 })
      : { matches: [] },
    // !hasDefaultFilter ? pineconeQuery(promptEmbedding, { topK: 5 }) : { matches: [] } // TODO: Use topK from config
  ])?.then((vectors) => vectors?.map((v) => v?.matches || []).flat());

  // TODO: Filter pinecone data by threshold

  const context = [
    // `${history}`,
    ...(!pineconeData ? [] : pineconeData?.map((item: any) => item?.metadata?.text))
  ].join(' <SEP> ');

  let summary = context;

  if (context) {
    const contextDocs = await textSplitter.createDocuments([context]);
    console.log('contextDocs', contextDocs?.length);
    if (contextDocs.length > 1) {
      console.time('Summarization Chain');
      const summaries = await Promise.all(
        contextDocs?.map((doc) =>
          summarizeChain.call({
            agent_scratchpad: '',
            input: doc.pageContent,
            prompt: prompt
          })
        )
      );
      const response = await summarizeChain.call({
        agent_scratchpad: '',
        input: summaries?.map((sum) => sum.text)?.join(' <SEP> '),
        prompt
      });
      summary = response.text;
      console.timeEnd('Summarization Chain');
    }
  }
  return {
    pineconeData,
    context,
    summary
  };
};
