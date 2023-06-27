import { EventVersionHandler } from './EventVersionHandler';
import { prisma } from '@db/client';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import embedVectors from '../pinecone/embedVectors';
import { v4 as uuidV4 } from 'uuid';

export const alpha42Embeddings: EventVersionHandler<{
  repo: string;
  text: string;
  filePath: string;
  organizationId?: string;
  code?: string;
}> = {
  event: 'alpha42/repo.sync',
  v: '1',
  handler: async ({ event }) => {
    const source = 'alpha42';
    const user = await prisma.user.findUnique({
      where: { id: event?.user?.id! },
      include: { currentOrganization: true }
    });

    if (!user?.id) throw new Error('No user found');

    const data = event.data;
    const { text, repo, filePath, code } = data;

    let organizationId = user.organizationId;
    if (user.role === 'superadmin' && data.organizationId) {
      organizationId = data.organizationId;
    }

    const url = `${repo}${filePath}`;

    await prisma.document.create({
      data: {
        title: repo,
        url,
        content: text,
        metadata: {
          url,
          repo,
          source,
          text,
          filePath,
          code
        },
        source
      }
    });

    if (!organizationId) throw new Error('No organizationId found');

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 3000 });

    const chunks = await textSplitter.createDocuments([text || '']);

    const embeddedVectors = await embedVectors(
      organizationId,
      event,
      chunks.map(({ pageContent }, idx) => ({
        uid: `Alpha42_${idx}_${url}`,
        text: `${pageContent}`,
        metadata: {
          url,
          repo,
          source,
          text,
          filePath,
          code
        }
      }))
    );
    return embeddedVectors;
  }
};
