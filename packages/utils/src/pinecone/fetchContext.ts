import { Configuration, OpenAIApi } from 'openai';

const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  return new OpenAIApi(configuration);
};
import { PineconeClient } from '@pinecone-database/pinecone';
import { pineconeQuery } from './pineconeQuery';
import { Chat } from 'db/generated/prisma-client';
import { AnswersFilters, DataSourcesFilters, Message, SourceFilters } from 'types';
// import { PromptLayerOpenAI, OpenAI } from 'langchain/llms';
// import { loadQAMapReduceChain } from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import OpenAIClient from '../openai/openai';
import { summarizeAI } from '../summarizeAI';

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
  filters = {},
  threshold = 0.75 //TODO Calculate threshold based on input and pineconedata
}: {
  chat?: Chat;
  prompt: string;
  messages: Message[];
  filters: AnswersFilters;
  threshold?: number;
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
              ...(sourceFilter[field]?.length
                ? {
                    [field]: {
                      $in: sourceFilter[field]?.map((value: string) =>
                        value?.toString().toLowerCase()
                      )
                    }
                  }
                : null)
            }),
            {}
          )
        };
      }
    });
  }
  Object.keys(filter)?.forEach((source) => {
    if (Object.keys(filter[source])?.length === 0) {
      delete filter[source];
    }
  });

  console.log('[FetchContext]', JSON.stringify({ datasources, filters, filter }));

  const pineconeData = await Promise.all([
    ...Object.entries(datasources)?.map(([source]) => {
      return pineconeQuery(promptEmbedding, {
        filter: {
          ...filter[source]
        },
        topK: 100
      });
    }),
    // TODO: Remove unfiltered search?
    pineconeQuery(promptEmbedding, {
      topK: 100
    })
  ])?.then((vectors) => vectors?.map((v) => v?.matches || []).flat());
  // TODO: Filter pinecone data by threshold

  const context = [
    // `${history}`,
    ...(!pineconeData
      ? []
      : pineconeData?.filter((x) => x.score! > threshold)?.map((item: any) => item?.metadata?.text))
  ].join(' <SEP> ');

  // 100 vectors(avg 4000) -> 1
  // 100 vectors(avg 1000) -> 4

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 40000 });
  const contextChunks = await textSplitter.createDocuments([context]);

  if (contextChunks?.length > 1) {
    console.log('Context too large', contextChunks?.length);
  }

  const contextText = contextChunks[0]?.pageContent;
  let summary = await summarizeAI({
    input: contextText,
    prompt,
    chunkSize: 3000
  });
  console.log('SUMMARY RATIO', (summary?.length / contextText?.length) * 100);

  return {
    pineconeData,
    context: contextText,
    summary
  };
};
