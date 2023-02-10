const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const { createContextFromObject } = require("./jira");
const OpenAI = require("./openai");
const Pinecone = require("./pinecone");

class JiraObject {
  constructor(object) {
    this.object = object;
  }

  getContext() {
    return createContextFromObject(this.object);
  }

  getTokenCount() {
    return tokenizer.tokenize(this.context);
  }

  async prepareForEmbedding() {
    this.context = await this.getContext();
    this.tokens = await this.getTokenCount();
    this.embedding = await this.createEmbedding();
    this.vector = await this.createVector();
    return this.vector;
  }

  async createEmbedding() {
    const openAi = new OpenAI();
    const embedding = await openAi.createEmbedding(this.context);
    return embedding;
  }

  async createVector() {
    const pinecone = new Pinecone();
    const vector = await pinecone.createVector(
      `${this.object.objectType.replace(/\s/g, "").toLowerCase()}_${
        this.object.uid
      }`,
      this.object,
      this.embedding
    );

    return vector;
  }
}

module.exports = JiraObject;
