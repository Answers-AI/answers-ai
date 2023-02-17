import { Configuration, OpenAIApi } from "openai";

const defaultModel = "text-embedding-ada-002";

class OpenAI {
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
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

  async createEmbedding(input, model = defaultModel) {
    try {
      const response = await this.openai.createEmbedding({
        model,
        input,
      });
      const embedding = response?.data?.data[0]?.embedding;
      if (!embedding) {
        throw new Error("No embedding returned");
      }
      return embedding;
    } catch (error) {
      console.error(`Error creating embedding: ${error}`);
      throw error;
    }
  }
}

export default OpenAI;
