const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const OpenAI = require("../../openai/openai");
const Vector = require("../../utilities/vector");

const embeddingJoinSeparator = " ";

class AnswersObject {
  constructor(object) {
    this.object = object;
  }

  getContext() {
    return this.createContextFromObject(this.object);
  }

  getTokenCount() {
    return tokenizer.tokenize(this.context);
  }

  createContextFromObject(obj) {
    const trimValues = ["", undefined, null, "indeterminate"];
    let context = Object.entries(obj)
      .filter(
        ([, value]) => !trimValues.includes(value) && typeof value !== "object"
      )
      .map(
        ([key, value]) =>
          `${key.replace(/([A-Z_])/g, " $1").toUpperCase()}: ${value}`
      )
      .join(embeddingJoinSeparator);

    return context;
  }

  async prepareForEmbedding() {
    this.context = await this.getContext();
    this.tokens = await this.getTokenCount();
    this.embedding = await this.createEmbedding();
    this.vector = this.createVector();
    return this.vector;
  }

  async createEmbedding() {
    const openAi = new OpenAI();
    const embedding = await openAi.createEmbedding(this.context);
    return embedding;
  }

  createVector() {
    const objectType = this.object.objectType.replace(/\s/g, "").toLowerCase();
    const uid = this.object.uid;
    const id = `${objectType}_${uid}`;
    const vector = new Vector(id, this.object, this.embedding);

    return vector;
  }
}

module.exports = AnswersObject;
