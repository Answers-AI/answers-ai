import { PineconeClient } from '@pinecone-database/pinecone';
import { pineconeQuery } from './pineconeQuery';
import { Chat } from 'db/generated/prisma-client';
import { AnswersFilters, Message, User, Sidekicks, Sidekick, WebUrlType } from 'types';
import OpenAIClient from '../openai/openai';
import { countTokens } from '../utilities/countTokens';
import { getUniqueUrls } from '../getUniqueUrls';

const openai = new OpenAIClient();
export const pinecone = new PineconeClient();

// TODO: find a more dynamic way to parse the filters into Pinecone
const parseFilters = (filters: AnswersFilters) => {
  let parsedFilters = { ...filters };
  if (parsedFilters?.datasources?.confluence?.spaces) {
    parsedFilters.datasources.confluence.spaceId = parsedFilters.datasources.confluence.spaces.map(
      (space) => space.id
    );
    delete parsedFilters.datasources.confluence.spaces;
  }

  if (parsedFilters?.datasources?.web?.url?.length) {
    // TODO: Define a type for the Pinecone filters which this function must return
    (parsedFilters.datasources.web.url as any) = getUniqueUrls(
      parsedFilters?.datasources?.web?.url.map((url) => (url as WebUrlType)?.url)
    );
  }

  return parsedFilters;
};

const filterPineconeDataRelevanceThreshhold = (data: any[], threshold: number) => {
  const sortedData = data
    .filter((x: { score: number }) => x.score > threshold)
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score);

  return sortedData;
};

const getMaxContextTokens = (gptModel: string) => {
  switch (gptModel) {
    case 'gpt-3.5-turbo':
      return 3500;
    case 'gpt-4':
      return 7000;
    default:
      return 3500;
  }
};

export const fetchContext = async ({
  user,
  prompt,
  messages = [],
  filters: clientFilters = {},
  sidekick, // added default value
  gptModel = 'gpt-3.5-turbo'
}: {
  user: User;
  prompt: string;
  messages?: Message[];
  filters?: AnswersFilters;
  sidekick?: Sidekick;
  gptModel?: string;
}) => {
  const ts = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const filters = parseFilters(clientFilters);
  const promptEmbedding = await openai.createEmbedding({
    input: prompt?.toLowerCase(),
    model: 'text-embedding-ada-002'
  });

  // if (!hasDefaultFilter) {
  //   filters = await extractFilters(prompt, filters);
  // }
  // TODO: Need to check Postgres for ID and organization
  // TODO: We need to scrub the results of any items the user does not have access to
  //
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
      if (sourceFilter && Object.keys(sourceFilter)?.length) {
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

  console.time(`[${ts}] Pineconedata`);
  console.time(`[${ts}] Pineconedata get`);

  const pineconeData = await Promise.all([
    ...Object.entries(datasources)?.map(([source]) => {
      if (!filter[source]) return Promise.resolve(null);

      return pineconeQuery(promptEmbedding, {
        // TODO: Figure how to filter by namespace without having to re-index per user
        // namespace: `org-${user?.organizationId}`,
        filter: {
          source,
          ...filter[source]
        },
        topK: 200
      });
    })
  ])?.then((vectors) => vectors?.map((v) => v?.matches || []).flat());
  console.timeEnd(`[${ts}] Pineconedata get`);

  // Filter out any results that are above the relavance threshold, sort by score and retunr the max number based on gptModel
  let relevantData = filterPineconeDataRelevanceThreshhold(pineconeData, 0.68);

  // Render the context string based on the sidekick and number of tokens
  let totalTokens = 0;
  const contextSourceFilesUsed: string[] = [];
  const maxContextTokens = getMaxContextTokens(gptModel);

  console.log('RelevantData', { pineconeData, relevantData });
  const contextPromises = relevantData.map((item) => {
    if (sidekick?.contextStringRender) {
      const renderedContext = sidekick?.contextStringRender(item.metadata); // TODO: get this from the database to give us more flexibility
      const tokenCount = countTokens(renderedContext || '');

      if (totalTokens + tokenCount <= maxContextTokens) {
        console.log('[FetchContext] using file: ', item.metadata.filePath, tokenCount);
        contextSourceFilesUsed.push(item?.metadata?.filePath || item.metadata?.url); // TODO: standardize teh canonical location (UUID) of the file
        totalTokens += tokenCount;
        return renderedContext;
      } else {
        return null;
      }
    }
  });

  const filteredData = contextPromises;
  const context = filteredData.filter((result) => result !== null).join(' ');

  return {
    context,
    summary: context,
    contextSourceFilesUsed,
    ...(process.env.NODE_ENV === 'development'
      ? {
          pineconeFilters: filters,
          filteredData,
          pineconeData
        }
      : {})
  };
};
