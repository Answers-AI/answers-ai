declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PINECONE_ENVIRONMENT: string;
      PINECONE_API_KEY: string;
      PINECONE_INDEX: string;
      REDIS_CONNECTION_STRING: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
