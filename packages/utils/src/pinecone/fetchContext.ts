import { PineconeClient } from '@pinecone-database/pinecone';
import { pineconeQuery } from './pineconeQuery';
import { Chat } from 'db/generated/prisma-client';
import { AnswersFilters, Message } from 'types';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import OpenAIClient from '../openai/openai';
import { summarizeAI } from '../summarizeAI';

const openai = new OpenAIClient();
export const pinecone = new PineconeClient();

const processArray = (arr: Array<any>) => {
  console.time('Process Array');
  const map = new Map();

  for (const obj of arr) {
    const key = obj.metadata.url || obj.metadata.key;

    if (map.has(key)) {
      const value = `${map.get(key)}\n${obj.metadata.text}`;

      map.set(key, value);
    } else {
      map.set(key, obj.metadata.text);
    }
  }

  const reducedArr = Array.from(map, ([key, text]) => {
    const obj = arr.find((o) => o.metadata.key === key || o.metadata.url === key);
    return { ...obj, metadata: { ...obj.metadata, text } };
  });

  const firstScore = reducedArr[0].score;

  // filter out any items with a score less than 10% of the first item's score
  const filteredArr = reducedArr.filter((obj) => obj.score > firstScore * 0.99);
  console.log({ filteredArr });

  console.timeEnd('Process Array');

  return filteredArr;
};

// const SUMMARY_CHUNK_SIZE = 10_000; // Max
const SUMMARY_CHUNK_SIZE = 3_000; // Controls how many tokens will fit into each chunk sent to the summarization
const SUMMARY_TOKEN_SIZE = 2_000; // (openai max_tokens) Controls the ouput tokens of the summarization
const CONTEXT_PAGES = 2; // How many context pages we want to process for completion
const PINECONE_THRESHOLD = 0.68;
export const fetchContext = async ({
  chat,
  prompt,
  messages = [],
  filters = {},
  threshold = PINECONE_THRESHOLD //TODO Calculate threshold based on input and pineconedata
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

  // console.log('[FetchContext]', JSON.stringify({ datasources, filters, filter }));

  console.time('Pineconedata');
  console.time('Pineconedata get');

  const pineconeDataRaw = await Promise.all([
    ...Object.entries(datasources)?.map(([source]) => {
      return pineconeQuery(promptEmbedding, {
        filter: {
          ...filter[source]
        },
        topK: 10
      });
    }),
    pineconeQuery(promptEmbedding, {
      topK: 10
    })
  ])?.then((vectors) => vectors?.map((v) => v?.matches || []).flat());
  console.timeEnd('Pineconedata get');

  const pineconeData = processArray(pineconeDataRaw);

  console.time('Pineconedata score');
  const context = [
    // `${history}`,
    ...(!pineconeData
      ? []
      : pineconeData?.filter((x) => x.score! > threshold)?.map((item: any) => item?.metadata?.text))
  ].join(' <SEP> ');
  console.timeEnd('Pineconedata score');

  console.time('Pineconedata split');
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: SUMMARY_CHUNK_SIZE * CONTEXT_PAGES
  });
  let contextText = context;
  try {
    const contextChunks = await textSplitter.createDocuments([context]);

    contextText = contextChunks[0]?.pageContent;
  } catch (err) {
    console.log('Error creating documents with pinecone data', err);
  }
  console.timeEnd('Pineconedata split');
  console.time('Pineconedata summarize');
  let summary = await summarizeAI({
    input: contextText,
    prompt,
    chunkSize: SUMMARY_CHUNK_SIZE,
    maxTokens: SUMMARY_TOKEN_SIZE
  });

  console.timeEnd('Pineconedata summarize');
  console.timeEnd('Pineconedata');

  return {
    pineconeData,
    context: contextText,
    summary
  };
};
