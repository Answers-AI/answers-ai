import { PineconeClient } from '@pinecone-database/pinecone';
import { pineconeQuery } from './pineconeQuery';

import { prisma } from '@db/client';

import OpenAIClient from '../openai/openai';
import { countTokens } from '../utilities/countTokens';
import { renderTemplate } from '../utilities/renderTemplate';
import getUserContextFields from '../utilities/getUserContextFields';
import getOrganizationContextFields from '../utilities/getOrganizationContextFields';
import getMaxTokensByModel from '../utilities/getMaxTokensByModel';
import { getUniqueUrls } from '../getUniqueUrls';

import { AnswersFilters, Message, User, Sidekick, Organization, DataSourcesFilters } from 'types';

const PUBLIC_SOURCES = ['web', 'drive', 'github', 'notion', 'airtable'];
const EMBEDDING_MODEL = 'text-embedding-ada-002';
const DEFAULT_THRESHOLD = 0.68;
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

interface SourceConfig {
  objectName: string;
  sourceField?: string; // if no source field, read the value directly
  targetField: string;
  transform?: (values: string[]) => string[];
}

const defaultSourceConfig: SourceConfig = {
  objectName: 'documents',
  sourceField: 'url',
  targetField: 'url'
};

type SourceType = keyof DataSourcesFilters;

const sourceConfigs: Partial<Record<SourceType, SourceConfig[]>> = {
  web: [
    { ...defaultSourceConfig, transform: getUniqueUrls },
    {
      objectName: 'domains',
      targetField: 'domain',
      transform: getUniqueUrls
    }
  ],
  codebase: [
    {
      objectName: 'documents',
      sourceField: 'title',
      targetField: 'repo'
    }
  ],
  file: [defaultSourceConfig],
  document: [defaultSourceConfig],
  youtube: [defaultSourceConfig],
  zoom: [defaultSourceConfig],
  confluence: [
    {
      objectName: 'spaces',
      sourceField: 'id',
      targetField: 'spaceId'
    }
  ]
};

type PineconeQueryObject = {
  namespace?: string;
  filter: {
    [key: string]:
      | {
          $in: string[];
        }
      | string;
  };
  topK: 500;
};

function getUniqueValues(source: SourceType, data: any): string[] {
  const configs = sourceConfigs[source];
  if (!configs?.length) {
    return [];
  }

  const uniqueValues: string[] = [];
  configs.forEach((configItem) => {
    const documents = data[configItem.objectName];
    if (!documents || !Array.isArray(documents)) {
      return;
    }

    let values = documents
      .map((doc) => (configItem.sourceField ? doc[configItem.sourceField] : doc))
      .filter(Boolean);

    if (configItem.transform) {
      values = configItem.transform(values);
    }

    uniqueValues.push(...values);
  });

  return Array.from(new Set(uniqueValues)).map((v) => v.toString().toLowerCase());
}

function mapFiltersToQueries(data: AnswersFilters, organizationId?: string) {
  const result: PineconeQueryObject[] = [];

  for (const source in data.datasources) {
    if (Object.prototype.hasOwnProperty.call(data.datasources, source)) {
      const uniqueValues = getUniqueValues(
        source as SourceType,
        data.datasources?.[source as SourceType]
      );

      const configs = sourceConfigs[source as SourceType];

      if (configs?.length) {
        configs.forEach((configItem) => {
          if (!uniqueValues.length) {
            return;
          }
          const pineconeQueryObject: PineconeQueryObject = {
            ...(!PUBLIC_SOURCES.includes(source) && organizationId
              ? { namespace: `org-${organizationId}` }
              : {}),
            filter: {
              // TODO: in the future, we may want to also filter based on the model. not used right now
              // model: { "$in": [data.model] }
              source,
              [configItem.targetField]: {
                $in: uniqueValues
              }
            },
            topK: 500
          };

          result.push(pineconeQueryObject);
        });
      }
    }
  }

  return result;
}

const openai = new OpenAIClient();
export const pinecone = new PineconeClient();

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

  const queries = mapFiltersToQueries(clientFilters, organizationId);

  const promptEmbedding = await openai.createEmbedding({
    user,
    input: prompt?.toLowerCase(),
    model: EMBEDDING_MODEL
  });

  console.time(`[${ts}] Pineconedata`);
  console.time(`[${ts}] Pineconedata get`);

  const pineconeData = await Promise.all(
    queries.map(async (q) => pineconeQuery(promptEmbedding, q))
  )?.then((vectors) => vectors?.map((v) => v?.matches || []).flat());

  console.timeEnd(`[${ts}] Pineconedata get`);

  // Filter out any results that are above the relavance threshold, sort by score and return the max number based on gptModel
  let relevantData = pineconeData.length
    ? filterPineconeDataRelevanceThreshhold(pineconeData, DEFAULT_THRESHOLD)
    : [];

  if (!relevantData.length && pineconeData.length) {
    if (queries.length === 2) {
      console.log(
        "No relevent data found.   Since there are 2 sources, we're lowering the filtering threshold"
      );
      relevantData = filterPineconeDataRelevanceThreshhold(pineconeData, DEFAULT_THRESHOLD / 2);
    } else if (queries.length === 1) {
      console.log(
        "No relevent data found.   Since there is 1 source, we're removing the filtering threshold"
      );
      relevantData = pineconeData;
    }
  }

  let context: string = '';
  const contextSourceFilesUsed = new Set<string>();
  let filteredData: Array<string | null> = [];

  if (!!relevantData?.length) {
    // Render the context string based on the sidekick and number of tokens
    let totalTokens = 0;

    const maxCompletionTokens = sidekick?.maxCompletionTokens || 500;
    const model = sidekick?.aiModel || gptModel;
    const maxTokens = getMaxTokensByModel(model) - maxCompletionTokens;

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
        renderedContext = renderTemplate(contextStringRender, {
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
          pineconeFilters: queries.map((q) => q.filter),
          filteredData,
          pineconeData
        }
      : {})
  };
};
