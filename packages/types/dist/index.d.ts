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
export interface AppSettings {
    services: {
        name: string;
        enabled: boolean;
    }[];
    jira: {
        projects?: {
            key: string;
            enabled: boolean;
        }[];
    };
}
//# sourceMappingURL=index.d.ts.map