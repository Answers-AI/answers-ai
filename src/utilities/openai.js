const { Configuration, OpenAIApi } = require("openai");

class OpenAI {
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async createEmbedding(input, model = "text-embedding-ada-002") {
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

module.exports = OpenAI;
