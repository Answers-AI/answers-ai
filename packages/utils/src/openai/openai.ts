import {
  Configuration,
  CreateEmbeddingRequestInput,
  OpenAIApi,
  CreateCompletionRequest,
  CreateChatCompletionRequest,
  CreateCompletionResponse,
  CreateChatCompletionResponse
} from 'openai';

import redisLoader from '../redisLoader';
import DataLoader from 'dataloader';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
class OpenAI {
  defaultModel = 'text-embedding-ada-002';
  openai: OpenAIApi;
  embeddingsLoader: DataLoader<any, any>;
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.openai = new OpenAIApi(configuration);
    this.embeddingsLoader = redisLoader<string, number[]>({
      keyPrefix: 'openai',
      redisConfig: process.env.REDIS_URL as string,
      disableCache: false,
      getValuesFn: (keys) =>
        this.openai
          .createEmbedding({
            input: keys as string[],
            model: this.defaultModel
          })
          ?.then(async (res) => {
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

  async createEmbedding({
    input,
    model = this.defaultModel
  }: {
    input: CreateEmbeddingRequestInput;
    model?: string;
  }): Promise<number[]> {
    try {
      const response = await this.embeddingsLoader.load(input);
      return response;
    } catch (error) {
      console.error(`Error creating embedding: ${error}`);
      throw error;
    }
  }

  async createChatCompletion(
    input: CreateChatCompletionRequest
  ): Promise<CreateChatCompletionResponse> {
    if (!input.model) {
      input.model = this.defaultModel;
    }
    const completion = await this.openai.createChatCompletion(input).catch((error) => {
      throw Error(
        `Error creating chat completion: ${
          error?.response?.data?.error?.message || error.message || 'unknown error'
        }`
      );
    });

    return completion.data;
  }
}

export default OpenAI;
