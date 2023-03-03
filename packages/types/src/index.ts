export type PineconeObject = {
  vectors: PineconeVector[];
};

export type PineconeVector = {};
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
  slack: {
    channels?: SlackChannelSetting[];
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
