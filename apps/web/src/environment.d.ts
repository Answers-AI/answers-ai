declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PINECONE_ENVIRONMENT: string;
      PINECONE_API_KEY: string;
      PINECONE_INDEX: string;
      REDIS_CONNECTION_STRING: string;
      INNGEST_SIGNING_KEY: string;
      INNGEST_SERVER_URL?: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
