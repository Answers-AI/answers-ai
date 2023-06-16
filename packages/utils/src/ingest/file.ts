import { inngest } from './client';
import { EventVersionHandler } from './EventVersionHandler';
import { chunkArray } from '../utilities/utils';
import { prisma } from '@db/client';
import { v4 as uuidV4 } from 'uuid';

import { PineconeVector } from 'types';

const PINECONE_VECTORS_BATCH_SIZE = 100;
/* 
{
   "name": "file/markdown.indexed",
   "data": {
       "content":"this is my content"
   },
   "user": {
       "organizationId":"clhsdwho300u5yz8yngj4mgk2"
   }
  }
*/
export const indexText: EventVersionHandler<{
  title?: string;
  url?: string;
  content?: string;
  organizationId: string;
}> = {
  event: 'file/markdown.index',
  v: '1',
  handler: async ({ event }) => {
    console.time('indexText');
    const user = await prisma.user.findUnique({
      where: { id: event?.user?.id! },
      include: { currentOrganization: true }
    });

    if (!user?.id) throw new Error('No user found');

    const data = event.data;
    const { content, title } = data;
    let organizationId = user.organizationId;
    if (user.role === 'superadmin' && data.organizationId) {
      organizationId = data.organizationId;
    }
    // TODO: Use a provided
    const fileTextId = data.url ?? uuidV4();
    const url = `file://${user.organizationId}/${fileTextId}`;

    await prisma.document.create({
      data: {
        title,
        url,
        content,
        source: 'file'
      }
    });
    if (!organizationId) throw new Error('No organizationId found');
    const embeddedVectors = await embedVectors(organizationId, event, [
      {
        uid: `File_${url}`,
        text: `${content}`,
        metadata: {
          url,
          source: 'file',
          text: content
        }
      }
    ]);
    return embeddedVectors;
  }
};

const embedVectors = async (organizationId: string, event: any, vectors: PineconeVector[]) => {
  let outVectors: void[] = [];

  if (vectors?.length && vectors?.every((x: any) => !!x)) {
    outVectors = await Promise.all(
      chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map((batchVectors, i) => {
        return inngest.send({
          v: '1',
          ts: new Date().valueOf(),
          name: 'pinecone/vectors.upserted',
          data: {
            _page: i,
            _total: vectors.length,
            _batchSize: PINECONE_VECTORS_BATCH_SIZE,
            vectors: batchVectors,
            organizationId
          },
          user: event.user
        });
      })
    );
  }

  return outVectors;
};
