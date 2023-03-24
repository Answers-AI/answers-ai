import { chunkArray } from '../utilities/utils';
import { PineconeClient as PC } from '@pinecone-database/pinecone';

class PineconeClient {
  constructor(config) {
    const apiKey = config.apiKey || process.env.PINECONE_API_KEY;
    const environment = config.environment || process.env.PINECONE_ENVIRONMENT;

    if (!apiKey) {
      throw new Error(
        'Missing Pinecone API key. Please provide one in the config or set the PINECONE_API_KEY environment variable.'
      );
    }

    if (!environment) {
      throw new Error(
        'Missing Pinecone environment. Please provide one in the config or set the PINECONE_ENVIRONMENT environment variable.'
      );
    }

    // Create a client
    this.client = new PC();

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
      environment: this.environment
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
    console.time('writeVectorToIndex');
    await this.init();
    const index = this.client.Index(this.indexName);
    //TODO: Remove after testing
    // await this.deleteIndex(index);

    await index.upsert({
      vectors: [vector],
      namespace: this.namespace
    });

    console.timeEnd('writeVectorToIndex');
  }

  async writeVectorsToIndex(vectors) {
    // console.time('writeVectorsToIndex');
    await this.init();

    const index = this.client.Index(this.indexName);

    //TODO: Remove after testing
    // await this.deleteIndex(index);
    // console.log('Vector', vectors[0]);
    //TODO add checks for token size and chunk efficiently
    const chunks = chunkArray(vectors, 100);
    const results = await Promise.all(
      chunks.map(async (chunkedVectors) => {
        const upsertRequest = {
          vectors: chunkedVectors,
          namespace: this.namespace
        };
        try {
          await index.upsert(upsertRequest);
        } catch (error) {
          console.log('Error', error);
          return { error };
        }
      })
    );

    const errors = results.filter((result) => !!result?.error);
    console.log('Errors', errors?.length);
    if (errors?.length) {
      throw errors[0];
    }
    console.timeEnd('writeVectorsToIndex');
  }
}

export default PineconeClient;
