import { Configuration, OpenAIApi } from 'openai';

const defaultModel = 'text-embedding-ada-002';
import Redis from 'ioredis';

class OpenAI {
  openai: OpenAIApi;
  redis: any;
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.openai = new OpenAIApi(configuration);
    this.redis = new Redis(process.env.REDIS_CONNECTION_STRING as string);
  }

  //TODO: Test if we're hitting rate limits
  // async createEmbeddingBatch(inputs, model = defaultModel) {
  //   try {
  //     const response = await this.openai.createEmbedding({
  //       model,
  //       inputs,
  //     });
  //     const embedding = response?.data?.data[0]?.embedding;
  //     if (!embedding) {
  //       throw new Error("No embedding returned");
  //     }
  //     return embedding;
  //   } catch (error) {
  //     console.error(`Error creating embedding: ${error}`);
  //     throw error;
  //   }
  // }

  async createEmbedding(input: any, model = defaultModel) {
    try {
      // Create hashKey from json input
      const hashKey = Buffer.from('v1-' + JSON.stringify(input)).toString('base64');
      try {
        const cachedEmbedding = await this.redis.get(hashKey);

        if (cachedEmbedding) {
          return JSON.parse(cachedEmbedding);
        }
      } catch (err) {
        console.warn('NO REDIS CONNECTION, SKIPPING CACHE LOOKUP');
      }
      const response = await this.openai.createEmbedding({
        model,
        input
      });
      console.log('CreateEmbedding->No Cache hit');
      const embedding = response?.data?.data[0]?.embedding;
      if (!embedding) {
        throw new Error('No embedding returned');
      }
      await this.redis.set(hashKey, JSON.stringify(embedding));
      return embedding;
    } catch (error) {
      console.error(`Error creating embedding: ${error}`);
      throw error;
    }
  }
}

export default OpenAI;
