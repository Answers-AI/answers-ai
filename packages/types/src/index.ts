export type PineconeObject = {
  vectors: PineconeVector[];
};

export type PineconeVector = {};
export type RecommendedPrompt = {
  question: string;
  actor?: string;
  likes?: number;
  views?: number;
};
