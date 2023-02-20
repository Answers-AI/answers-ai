export type PineconeObject = {
  vectors: PineconeVector[];
};

export type PineconeVector = {};
export type RecommendedPrompt = {
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
}
