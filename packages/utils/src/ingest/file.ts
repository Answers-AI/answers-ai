import { EventVersionHandler } from './EventVersionHandler';
import { prisma } from '@db/client';
import { v4 as uuidV4 } from 'uuid';

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import embedVectors from '../pinecone/embedVectors';

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
const slugify = (text?: string) =>
  text
    ?.toLowerCase()
    ?.replace(/ /g, '-')
    ?.replace(/[^\w-]+/g, '');

export const indexText: EventVersionHandler<{
  source?: string;
  title?: string;
  url?: string;
  content: string;
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
    const { content, title, source } = data;
    let organizationId = user.organizationId;
    if (user.role === 'superadmin' && data.organizationId) {
      organizationId = data.organizationId;
    }
    // TODO: Use a provided
    const fileTextId = uuidV4();
    const slug = slugify(title);
    const url =
      data.url ??
      `https://files.theanswerai.com/files/${user.organizationId}/${slug}-${fileTextId}`;

    await prisma.document.create({
      data: {
        title,
        url,
        content,
        source: source ?? 'file'
      }
    });
    if (!organizationId) throw new Error('No organizationId found');

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 3000 });

    const chunks = await textSplitter.createDocuments([content]);

    const embeddedVectors = await embedVectors(
      organizationId,
      event,
      chunks.map(({ pageContent }, idx) => ({
        uid: `File_${idx}_${url}`,
        text: `${pageContent}`,
        metadata: {
          url,
          source: source ?? 'file',
          text: pageContent
        }
      }))
    );
    return embeddedVectors;
  }
};
