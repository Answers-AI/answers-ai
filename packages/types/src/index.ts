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
  services: AppService[];
  jira: {
    projects?: {
      key: string;
      enabled: boolean;
    }[];
  };
  slack: {
    channels?: SlackChannelSetting[];
  };
  web: {
    urls?: WebSetting[];
    domains?: WebSetting[];
  };
  openapi: {
    urls?: OpenApiSetting[];
  };
  models: Models;
}

export interface AnswersFilters {
  userName?: string[];
  projectName?: string[];
  issueKey?: string[];
  channelId?: string[];
  cleanedUrl?: string[];
  url?: string[];
  domain?: string[];
  models?: {
    [key: string]: string[];
  };
}

type Models = {
  jira: string[];
  slack: string[];
  web: string[];
  openapi: string[];
  [key: string]: string[];
};

export type User = {
  email: string;
  appSettings: AppSettings;
};

export type Prompt = {
  content: string;
};
export type Chat = {
  prompt: Prompt;
  id: string;
};

export type SlackChannel = { id: string; name: string };
export interface SlackChannelSetting extends SlackChannel {
  enabled: boolean;
}
export type SlackMessage = {};

export type Message = {
  id: string;
  role: string;
  content: string;
};

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
