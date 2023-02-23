import { Configuration, CreateEmbeddingRequestInput, OpenAIApi } from 'openai';

import Redis from 'ioredis';
import redisLoader from '../redisLoader';
import DataLoader from 'dataloader';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
class OpenAI {
  defaultModel = 'text-embedding-ada-002';
  openai: OpenAIApi;
  redis: any;
  loader: DataLoader<any, any>;
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.openai = new OpenAIApi(configuration);
    this.redis = new Redis(process.env.REDIS_URL as string);
    this.loader = redisLoader<CreateEmbeddingRequestInput, number[]>({
      keyPrefix: 'openai',
      redisConfig: process.env.REDIS_URL as string,
      getValuesFn: (keys) =>
        this.openai
          .createEmbedding({
            //@ts-expect-error
            input: keys,
            model: this.defaultModel
          })
          ?.then(async (res) => {
            // console.log('Respoonse', res);
            return res?.data?.data?.map((d) => d?.embedding);
          })
    });
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

  async createEmbedding(
    input: CreateEmbeddingRequestInput,
    model = this.defaultModel
  ): Promise<number[]> {
    try {
      // console.log('CreateEmbedding', input);
      return this.loader.load(input);
    } catch (error) {
      console.error(`Error creating embedding: ${error}`);
      throw error;
    }
  }
}

export default OpenAI;
