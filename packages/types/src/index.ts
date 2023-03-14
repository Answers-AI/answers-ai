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
  prompt: string;
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
  confluence: {
    spaces?: {
      key: string;
      enabled: boolean;
    };
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
}

export type User = {
  email: string;
  appSettings: AppSettings;
};

export type SlackChannel = { id: string; name: string };
export interface SlackChannelSetting extends SlackChannel {
  enabled: boolean;
}
export type SlackMessage = {};

export type Message = {
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

export type ConfluencePage = { id: string; space: string; body: string };
export interface ConfluenceSetting extends ConfluencePage {
  enabled: boolean;
}
