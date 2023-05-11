import PineconeClient from '../pinecone/client';
import { EventVersionHandler } from './EventVersionHandler';
import { PineconeVector } from 'types';
import { prisma } from 'db/dist';
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
    // console.log(vectors);

    // TODO: Extract all the parentIDs from the new vectors
    // TODO: Fetch all the vectors with  parentIDs from pinecoone

    const vectorData = await Promise.all(
      vectors?.map((vector) =>
        openAi.createEmbedding({ input: vector.text }).then((embedding) => ({
          id: vector.uid,
          metadata: { ...vector.metadata, text: vector.text },
          values: embedding
        }))
      )
    );

    if (!DISABLE_EMBEDDING) await pinecone.writeVectorsToIndex(vectorData);

    const documentUrls = vectors?.map(
      (vector) => vector.metadata?.url ?? vector.metadata?.documentId
    );
    await prisma.document.updateMany({
      where: {
        url: { in: documentUrls }
      },
      data: {
        status: 'synced',
        lastSyncedAt: new Date()
      }
    });
  }
};
