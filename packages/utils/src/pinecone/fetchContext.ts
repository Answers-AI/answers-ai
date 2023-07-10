import { PineconeClient } from '@pinecone-database/pinecone';
import { pineconeQuery } from './pineconeQuery';

import { prisma } from '@db/client';

import OpenAIClient from '../openai/openai';
import { countTokens } from '../utilities/countTokens';
import { renderContext } from '../utilities/renderContext';
import getUserContextFields from '../utilities/getUserContextFields';
import getOrganizationContextFields from '../utilities/getOrganizationContextFields';
import getMaxTokensByModel from '../utilities/getMaxTokensByModel';
import { getUniqueUrls } from '../getUniqueUrls';

import { AnswersFilters, Message, User, Sidekick, WebUrlType, Organization } from 'types';

const EMBEDDING_MODEL = 'text-embedding-ada-002';
const DEFAULT_THRESHOLD = 0.68;
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

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

  if (parsedFilters?.datasources?.file?.url?.length) {
    (parsedFilters.datasources.file.url as any) = parsedFilters?.datasources?.file?.url.map(
      (url) => (url as any)?.url
    );
  }

  if (parsedFilters?.datasources?.youtube?.url?.length) {
    (parsedFilters.datasources.youtube.url as any) = parsedFilters?.datasources?.youtube?.url.map(
      (url) => (url as any)?.url
    );
  }
  if (parsedFilters?.datasources?.document?.url?.length) {
    (parsedFilters.datasources.document.url as any) = parsedFilters?.datasources?.document?.url.map(
      (url) => (url as any)?.url
    );
  }

  if (parsedFilters?.datasources?.zoom?.url?.length) {
    (parsedFilters.datasources.zoom.url as any) = parsedFilters?.datasources?.zoom?.url.map(
      (url) => (url as any)?.url
    );
  }
  if (parsedFilters?.datasources?.codebase?.repo?.length) {
    // TODO: Define a type for the Pinecone filters which this function must return
    (parsedFilters.datasources.codebase.repo as any) =
      parsedFilters?.datasources?.codebase?.repo.map(({ title }) => title);
  }

  return parsedFilters;
};

const filterPineconeDataRelevanceThreshhold = (data: any[], threshold: number) => {
  if (!data) return [];

  const sortedData = data
    .filter((x: { score: number }) => x.score > threshold)
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score);

  return sortedData;
};

export const fetchContext = async ({
  user,
  organizationId,
  organization,
  prompt,
  messages = [],
  filters: clientFilters = {},
  sidekick, // added default value
  gptModel = 'gpt-3.5-turbo'
}: {
  user?: User;
  organizationId?: string;
  organization?: Organization;
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
    model: EMBEDDING_MODEL
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

  console.log('[FetchContext]', JSON.stringify({ datasources, filters, filter }));

  console.time(`[${ts}] Pineconedata`);
  console.time(`[${ts}] Pineconedata get`);
  const PUBLIC_SOURCES = ['web', 'drive', 'github', 'notion', 'airtable'];
  const pineconeData = await Promise.all([
    ...Object.entries(datasources)?.map(([source]) => {
      if (!filter[source]) return Promise.resolve(null);

      return pineconeQuery(promptEmbedding, {
        ...(!PUBLIC_SOURCES.includes(source) && organizationId
          ? { namespace: `org-${organizationId}` }
          : {}),
        filter: {
          source,
          ...filter[source]
        },
        topK: 500
      });
    })
  ])?.then((vectors) => vectors?.map((v) => v?.matches || []).flat());
  console.timeEnd(`[${ts}] Pineconedata get`);

  // Filter out any results that are above the relavance threshold, sort by score and retunr the max number based on gptModel
  let relevantData = filterPineconeDataRelevanceThreshhold(pineconeData, DEFAULT_THRESHOLD);

  let context: string = '';
  const contextSourceFilesUsed = new Set<string>();
  let filteredData: Array<string | null> = [];

  if (!!relevantData?.length) {
    // Render the context string based on the sidekick and number of tokens
    let totalTokens = 0;

    const maxTokens = getMaxTokensByModel(gptModel);

    // Get organization's custom contact fields
    const organizationContext: Record<string, any> = getOrganizationContextFields(organization);

    // Get user's custom contect fields
    const userContext: Record<string, any> = getUserContextFields(user);

    const contextPromises = relevantData.map((item) => {
      if (totalTokens > maxTokens) {
        return null;
      }

      let renderedContext: string = item?.metadata?.text?.trim() ?? '';

      const preTokenCount = renderedContext !== '' ? countTokens(renderedContext) : 0;

      const contextStringRender =
        sidekick?.contextStringRender?.trim() !== '' ? sidekick?.contextStringRender : null;

      if (contextStringRender && totalTokens + preTokenCount <= maxTokens) {
        renderedContext = renderContext(contextStringRender, {
          result: item.metadata,
          organization: organizationContext,
          user: userContext
        }).trim();
      }

      if (renderedContext === '') return null;

      const tokenCount = countTokens(renderedContext);
      if (tokenCount && totalTokens + tokenCount > maxTokens) {
        return null;
      }

      // TODO: standardize the canonical location (UUID) of the file
      contextSourceFilesUsed.add(item?.metadata?.filePath || item?.metadata?.url);
      totalTokens += tokenCount;
      return renderedContext;
    });

    filteredData = contextPromises;
    context = filteredData.filter((result) => result !== null).join('\n\n');
  }

  const contextDocuments = await prisma.document.findMany({
    where: {
      url: { in: Array.from(contextSourceFilesUsed) }
    }
  });

  return {
    context,
    contextDocuments,
    ...(IS_DEVELOPMENT
      ? {
          pineconeFilters: filters,
          filteredData,
          pineconeData
        }
      : {})
  };
};
