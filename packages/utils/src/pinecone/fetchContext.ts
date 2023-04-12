import { PineconeClient } from '@pinecone-database/pinecone';
import { pineconeQuery } from './pineconeQuery';
import { Chat } from 'db/generated/prisma-client';
import { AnswersFilters, Message } from 'types';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import OpenAIClient from '../openai/openai';
import { summarizeAI } from '../summarizeAI';

const openai = new OpenAIClient();
export const pinecone = new PineconeClient();

// const SUMMARY_CHUNK_SIZE = 10_000; // Maximum number of tokens to send to the summarization
const SUMMARY_CHUNK_SIZE = 6_000; // Controls how many tokens will fit into each chunk sent to the summarization
const SUMMARY_TOKEN_SIZE = 2_000; // (openai max_tokens) Controls the ouput tokens of the summarization
const CONTEXT_PAGES = 1; // How many context pages we want to process for completion
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
  const ts = Date.now();
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

  console.time(`[${ts}] Pineconedata`);
  console.time(`[${ts}] Pineconedata get`);

  const pineconeData = await Promise.all([
    ...Object.entries(datasources)?.map(([source]) => {
      return pineconeQuery(promptEmbedding, {
        filter: {
          ...filter[source]
        },
        topK: 200
      });
    })
  ])?.then((vectors) => vectors?.map((v) => v?.matches || []).flat());
  console.timeEnd(`[${ts}] Pineconedata get`);

  const filteredData = pineconeData?.filter((x) => x.score! > threshold);
  const context = [
    // `${history}`,
    ...(!filteredData ? [] : filteredData?.map((item: any) => item?.metadata?.text))
  ].join(' <SEP> ');

  console.time(`[${ts}] Pineconedata split`);
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
  console.timeEnd(`[${ts}] Pineconedata split`);
  console.time(`[${ts}] Pineconedata summarize`);
  let summary = '';
  try {
    summary = await summarizeAI({
      input: contextText,
      prompt,
      chunkSize: SUMMARY_CHUNK_SIZE,
      maxTokens: SUMMARY_TOKEN_SIZE
    });
  } catch (error: any) {
    console.log(`[${ts}] Pineconedata summarize error`, error.message);
  }

  console.timeEnd(`[${ts}] Pineconedata summarize`);
  console.timeEnd(`[${ts}] Pineconedata`);

  return {
    context: contextText,
    summary,
    ...(process.env.NODE_ENV === 'development'
      ? {
          filteredData,
          pineconeData
        }
      : {})
  };
};
