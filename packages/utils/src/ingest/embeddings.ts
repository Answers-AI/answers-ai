import PineconeClient from '../pinecone/client';
import { EventVersionHandler } from './EventVersionHandler';
import { PineconeVector } from 'types';
import OpenAI from '../openai/openai';
const openAi = new OpenAI();

const pinecone = new PineconeClient({
  namespace: process.env.PINECONE_INDEX_NAMESPACE,
  indexName: process.env.PINECONE_INDEX
});

const DISABLE_EMBEDDING = false;

export const processVectorsUpserted: EventVersionHandler<{ vectors: PineconeVector[] }> = {
  event: 'pinecone/vectors.upserted',
  v: '1',
  handler: async ({ event }) => {
    const { vectors } = event.data;

    const vectorData = await Promise.all(
      vectors?.map((vector) =>
        openAi.createEmbedding(vector.text).then((embedding) => ({
          id: vector.uid,
          metadata: { ...vector.metadata, text: vector.text },
          values: embedding
        }))
      )
    );

    if (!DISABLE_EMBEDDING) await pinecone.writeVectorsToIndex(vectorData);
  }
};
