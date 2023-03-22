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
import { AnswersFilters, DataSourcesFilters, Message, SourceFilters } from 'types';
import { PromptLayerOpenAI, OpenAI } from 'langchain/llms';
import { loadQAMapReduceChain } from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import OpenAIClient from 'utils/dist/openai/openai';
import { summarizeAI, summarizeChain } from 'utils/dist/llm/chains';

const openai = new OpenAIClient();
export const pinecone = new PineconeClient();

// const model = process.env.PROMPT_LAYER_API_KEY
//   ? new PromptLayerOpenAI({
//       temperature: 0,
//       promptLayerApiKey: process.env.PROMPT_LAYER_API_KEY
//     })
//   : new OpenAI({ temperature: 0 });

// const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
// const qaChain = loadQAMapReduceChain(model);

export const fetchContext = async ({
  chat,
  prompt,
  messages = [],
  filters = {}
}: {
  chat?: Chat;
  prompt: string;
  messages: Message[];
  filters: AnswersFilters;
}) => {
  // const hasDefaultFilter = Object.keys(filters).length;
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

  const filter: { [source: string]: { [field: string]: string[] } } = {};
  const { models, datasources = {} } = filters;

  if (models) {
    filter.model = {
      $in: Object.keys(models)
        ?.map((model) => {
          return models?.[model];
        })
        .flat()
    };
  }
  if (datasources) {
    Object.entries(datasources).forEach(([source, sourceFilter]) => {
      if (sourceFilter) {
        filter[source] = {
          ...(filter[source] ?? {}),
          ...Object.keys(sourceFilter).reduce(
            (acc, field) => ({
              ...acc,
              [field]: {
                $in: sourceFilter[field]?.map((value: string) => value?.toLowerCase())
              }
            }),
            {}
          )
        };
      }
    });
  }

  console.log('[FetchContext]', { datasources, filters, filter });
  const pineconeData = await Promise.all(
    Object.entries(datasources)?.map(([source]) => {
      return pineconeQuery(promptEmbedding, {
        filter: {
          ...filter[source]
        },
        topK: 5
      });
    })
  )?.then((vectors) => vectors?.map((v) => v?.matches || []).flat());

  // TODO: Filter pinecone data by threshold

  const context = [
    // `${history}`,
    ...(!pineconeData ? [] : pineconeData?.map((item: any) => item?.metadata?.text))
  ].join(' <SEP> ');

  let summary = await summarizeAI({
    input: context,
    prompt,
    chunkSize: 3000
  });

  return {
    pineconeData,
    context,
    summary
  };
};
