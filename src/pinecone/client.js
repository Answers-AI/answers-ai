require("dotenv").config();
const { PineconeClient: Pinecone } = require("pinecone-ts-client");
const { chunkArray } = require("../utilities/utils");

class PineconeClient {
  constructor(config) {
    const apiKey = config.apiKey || process.env.PINECONE_API_KEY;
    const environment = config.environment || process.env.PINECONE_ENVIRONMENT;

    if (!apiKey) {
      throw new Error(
        "Missing Pinecone API key. Please provide one in the config or set the PINECONE_API_KEY environment variable."
      );
    }

    if (!environment) {
      throw new Error(
        "Missing Pinecone environment. Please provide one in the config or set the PINECONE_ENVIRONMENT environment variable."
      );
    }

    // Create a client
    this.client = new Pinecone();

    this.apiKey = apiKey;
    this.environment = environment;
    this.namespace = config.namespace;
    this.indexName = config.indexName;
    this.index = undefined;
    this.init();
  }

  async init() {
    await this.client.init({
      apiKey: this.apiKey,
      environment: this.environment,
    });
  }

  async deleteIndex(index) {
    return index.delete1([], true, this.namespace);
  }

  async deleteIndexByName(indexName = this.indexName) {
    const index = this.client.Index(indexName);
    return index.delete1([], true, this.namespace);
  }

  async writeVectorToIndex(vector) {
    console.time("writeVectorToIndex");
    const index = this.client.Index(this.indexName);

    //TODO: Remove after testing
    // await this.deleteIndex(index);

    await index.upsert({
      vectors: [vector],
      namespace: this.namespace,
    });

    console.timeEnd("writeVectorToIndex");
  }

  async writeVectorsToIndex(vectors) {
    console.time("writeVectorsToIndex");

    const index = this.client.Index(this.indexName);

    //TODO: Remove after testing
    // await this.deleteIndex(index);

    let pineconeUpsertPromises = chunkArray(vectors, 100);
    pineconeUpsertPromises.map((chunkedVectors) => {
      const upsertRequest = {
        vectors: chunkedVectors,
        namespace: this.namespace,
      };
      return index.upsert(upsertRequest);
    });

    await Promise.all(pineconeUpsertPromises);
    console.timeEnd("writeVectorsToIndex");
  }
}

module.exports = PineconeClient;
