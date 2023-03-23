import * as DB from 'db/generated/prisma-client';

import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';
export type PineconeObject = {
  vectors: PineconeVector[];
};

export type PineconeVector = {
  text: string;
  metadata: any;
  uid: string;
};
export type RecommendedPrompt = {
  id: string;
  title?: string;
  content: string;
  actor?: string;
  likes?: number;
  views?: number;
};
export interface AppService {
  name: string;
  enabled: boolean;
}
export interface AppSettings {
  services?: AppService[];
  jira?: {
    projects?: {
      key: string;
      enabled: boolean;
    }[];
  };
  confluence: {
    spaces?: ConfluenceSpaceSetting[];
    pages?: {
      key: string;
      enabled: boolean;
    }[];
  };
  slack: {
    channels?: SlackChannelSetting[];
  };
  web?: {
    urls?: WebSetting[];
    domains?: WebSetting[];
  };
  openapi?: {
    urls?: OpenApiSetting[];
  };
  models?: Models;
}

export interface JiraFilters {
  project?: string[];
  account?: string[];
  assignee?: string[];
  priority?: string[];
  status_category?: string[];
}
export interface SlackFilters {
  channelId?: string[];
}
export interface WebFilters {
  cleanedUrl?: string[];
  url?: string[];
  domain?: string[];
}
export interface OpenApiFilters {}
export interface ConfluenceFilters {
  spaceId?: string[];
}
export interface UserFilters {}
export type SourceFilters =
  | JiraFilters
  | SlackFilters
  | WebFilters
  | OpenApiFilters
  | ConfluenceFilters;
export interface DataSourcesFilters {
  user?: UserFilters;
  jira?: JiraFilters;
  slack?: SlackFilters;
  web?: WebFilters;
  openapi?: OpenApiFilters;
  confluence?: ConfluenceFilters;
}
export interface AnswersFilters {
  models?: {
    [key: string]: string[];
  };
  datasources?: DataSourcesFilters;
}

type Models = {
  jira: string[];
  slack: string[];
  web: string[];
  openapi: string[];
  [key: string]: string[];
};

export interface User extends Omit<DB.User, 'appSettings'> {
  appSettings: AppSettings;
}

export interface Prompt extends DB.Prompt {
  content: string;
}
export interface Chat extends Omit<DB.Chat, 'filters'> {
  filters: AnswersFilters;
  prompt: Prompt | null;
  messages: Message[] | null;
}

export interface Journey extends DB.Journey {
  chats: Chat[] | null;
}

export type SlackChannel = { id: string; name: string };
export interface SlackChannelSetting extends SlackChannel {
  enabled: boolean;
}
export type SlackMessage = {};

export type ConfluenceSpace = {
  key: string;
  id: string;
  name: string;
  type: string;
  status: string;
  expand: string;
  _links: {
    self: string;
  };
};
export interface ConfluenceSpaceSetting extends ConfluenceSpace {
  enabled: boolean;
}

export interface Message extends Partial<DB.Message>, ChatCompletionRequestMessage {
  user?: User | null;
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
}

export type WebPage = { url: string; content: string };
export interface WebSetting extends WebPage {
  enabled: boolean;
}

export type OpenApi = {
  paths: string[];
  info: {
    title: string;
    version: string;
  };
};
export interface OpenApiSetting extends OpenApi {
  enabled: boolean;
}

export interface OpenApiProvider {
  added: string;
  preferred: string;
  versions: {
    [version: string]: {
      added: string;
      info: {
        'contact'?: {
          'email'?: string;
          'name'?: string;
          'url'?: string;
          'x-twitter'?: string;
        };
        'description'?: string;
        'license'?: {
          name?: string;
          url?: string;
        };
        'termsOfService'?: string;
        'title'?: string;
        'version'?: string;
        'x-apisguru-categories'?: string[];
        'x-logo'?: {
          url?: string;
          backgroundColor?: string;
        };
        'x-origin'?: {
          format?: string;
          url?: string;
          version?: string;
        }[];
        'x-providerName'?: string;
        'x-serviceName'?: string;
        [key: string]: any;
      };
      updated: string;
      swaggerUrl?: string;
      swaggerYamlUrl?: string;
      openapiVer?: string;
      externalDocs?: {
        description?: string;
        url?: string;
        [key: string]: any;
      };
      [key: string]: any;
    };
  };
}

export type ConfluencePage = { id: string; space: string; body: string };
export interface ConfluenceSetting extends ConfluencePage {
  enabled: boolean;
}
