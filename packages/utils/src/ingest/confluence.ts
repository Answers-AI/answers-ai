import { inngest } from './client';
import { confluencePageLoader, confluencePagesLoader } from '../confluence';
import { EventVersionHandler } from './EventVersionHandler';
import { chunkArray } from '../utilities/utils';
import { ConfluencePage } from '../confluence';
import { getConfluencePages } from '../confluence/getConfluencePages';

const PINECONE_VECTORS_BATCH_SIZE = 100;

const prefixHeaders = (markdown: string): string => {
  const lines = markdown.split('\n');
  let headerStack: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('#')) {
      const header = line.replace(/^#+\s*/, '');
      const levelMatch = line.match(/^#+/);
      const level = levelMatch ? levelMatch[0].length : 0;
      if (level <= headerStack.length) {
        headerStack = headerStack.slice(0, level - 1);
      }
      headerStack.push(header);
      lines[i] = `##### ${headerStack.join(' - ')}`;
    }
  }
  return lines.join('\n');
};

const splitMarkdown = (rawMarkdown: string) => {
  const headingsRegex = /\n+(?=\s*#####\s(?!#))/;
  const markdown = prefixHeaders(rawMarkdown)
    .replace(/\n{2,}/g, '\n')
    .replace(/^(#+\s+.+)\n(#+\s+.+\n)/gm, '$2');
  const markdownChunks = markdown.split(headingsRegex);
  return markdownChunks;
};

export const processConfluencePages: EventVersionHandler<{ pageIds: string[] }> = {
  event: 'confluence/app.sync',
  v: '1',
  handler: async ({ event }) => {
    const confluencePages = (await getConfluencePages()) as ConfluencePage[];

    const vectors = confluencePages.flatMap((page: ConfluencePage | null) => {
      if (!page) return null;
      const markdownChunks: string[] = splitMarkdown(`# ${page.title}\n${page.content}`);
      if (!markdownChunks?.length) return null;

      return markdownChunks.map((headingChunk: any, i: any) => ({
        uid: `ConfluencePage_${page.id}_${i}`,
        text: headingChunk,
        metadata: {
          id: page.id,
          spaceId: page.spaceId.toString(),
          status: page.status,
          title: page.title,
          authorId: page.authorId,
          createdAt: page.createdAt
        }
      }));
    });

    if (vectors?.length && vectors?.every((x) => !!x)) {
      await Promise.all(
        chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map((batchVectors, i) => {
          inngest.send({
            v: '1',
            ts: new Date().valueOf(),
            name: 'pinecone/vectors.upserted',
            data: {
              _page: i,
              _total: vectors.length,
              _batchSize: PINECONE_VECTORS_BATCH_SIZE,
              vectors: batchVectors
            },
            user: event.user
          });
        })
      );
    }
  }
};

export const processConfluencePage: EventVersionHandler<{ pageIds: string[] }> = {
  event: 'confluence/page.sync',
  v: '1',
  handler: async ({ event }) => {
    try {
      const data = event.data;
      const { pageIds } = data;

      const confluencePages = (await confluencePageLoader.loadMany(pageIds)) as ConfluencePage[];

      const vectors = confluencePages.flatMap((page) => {
        const markdownChunks = splitMarkdown(`# ${page.title}\n${page.content}`);

        return markdownChunks.map((headingChunk: any, i: any) => ({
          uid: `ConfluencePage_${page.id}_${i}`,
          text: headingChunk,
          metadata: {
            id: page.id,
            spaceId: page.spaceId.toString(),
            status: page.status,
            title: page.title,
            authorId: page.authorId,
            createdAt: page.createdAt
          }
        }));
      });

      if (vectors?.length && vectors?.every((x) => !!x)) {
        await Promise.all(
          chunkArray(vectors, PINECONE_VECTORS_BATCH_SIZE).map(async (batchVectors, i) => {
            const myEvent: any = await inngest.send({
              v: '1',
              ts: new Date().valueOf(),
              name: 'pinecone/vectors.upserted',
              data: {
                _page: i,
                _total: vectors.length,
                _batchSize: PINECONE_VECTORS_BATCH_SIZE,
                vectors: batchVectors
              },
              user: event.user
            });

            return myEvent;
          })
        );
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};
