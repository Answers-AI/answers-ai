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
  slack?: {
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
export interface UserFilters {}
export type SourceFilters = JiraFilters | SlackFilters | WebFilters | OpenApiFilters;
export interface DataSourcesFilters {
  user?: UserFilters;
  jira?: JiraFilters;
  slack?: SlackFilters;
  web?: WebFilters;
  openapi?: OpenApiFilters;
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
