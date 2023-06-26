import { inngest } from './client';
import { EventVersionHandler } from './EventVersionHandler';
import { chunkArray } from '../utilities/utils';
import { FileRecord } from 'types';
import { prisma } from 'db/dist';
import { fileLoader } from '../files';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { convertFileToMarkdown } from '../files/getFile';
import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

const PINECONE_VECTORS_BATCH_SIZE = 50;

const splitFileHtmlChunkMore = async (markdownChunk: string) => {
  const contextChunks = await recursiveCharacterTextSplitter.createDocuments([markdownChunk]);
  const smallerChunks = contextChunks.map((chunk) => `${chunk.pageContent}`);

  return smallerChunks;
};

const splitFileHtml = async (iFile: FileRecord) => {
  const file = await convertFileToMarkdown(iFile.fileId, iFile.content);
  const headingsRegex = /\n+(?=\s*#####\s(?!#))/;
  const markdown = prefixHeaders(file.content)
    .replace(/\n{2,}/g, '\n')
    .replace(/^(#+\s+.+)\n(#+\s+.+\n)/gm, '$2');

  const markdownChunks = markdown.split(headingsRegex);

  const contextChunks = await Promise.all(
    markdownChunks.map(async (chunk) => {
      const header = chunk.match(/(#+\s+.+)\n/)?.[1] ?? '';
      const content = chunk.replace(header, '');
      if (!content.trim().length || !header.trim().length) {
        return [''];
      }
      const chunkMore = await splitFileHtmlChunkMore(content);
      const chunksWithHeader = chunkMore.map((chunk) => `${header.replace('#####', '')}\n${chunk}`);
      return chunksWithHeader;
    })
  );
  return contextChunks.flat().filter((x) => x.trim() !== '');
};

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

const recursiveCharacterTextSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 6000 });

const getFileRecordsVectors = async (fileRecords: FileRecord[]) => {
  const vectors = (
    await Promise.all(
      fileRecords.map(async (file) => {
        if (!file?.content) {
          return [];
        }

        const markdownChunks = await splitFileHtml(file);

        // console.log('Markdown', page, markdownChunks);
        if (!markdownChunks?.length) return [];

        return markdownChunks.map((headingChunk: string, i: any) => ({
          uid: `File_${file.fileId}_${i}`,
          text: headingChunk,
          metadata: {
            source: 'file',
            fileId: file?.fileId?.toLowerCase()
          }
        }));
      })
    )
  )
    .flat()
    .filter(Boolean);

  return vectors;
};

const embedVectors = async (event: any, vectors: any[]) => {
  let outVectors: void[] = [];

  if (vectors?.length && vectors?.every((x: any) => !!x)) {
    outVectors = await Promise.all(
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

  return outVectors;
};

// This is a pdf file sent via post.
// Update the typescript and logic accordingly
export const processFile: EventVersionHandler<{
  fileBuffer: string;
  fileName: string;
  fileExtension: string;
}> = {
  event: 'files/doc.sync',
  v: '1',
  handler: async ({ event }) => {
    console.log('file here');
    const { fileBuffer, fileName, fileExtension } = event?.data;
    const fileNewBuffer = Buffer.from(fileBuffer, 'base64');
    console.log('file ingest', fileName, fileExtension);
    // const blob = new Blob([fileBuffer]);
    // const file = new File([blob], 'filename');
    const filePath = path.join(__dirname, fileName + '.' + fileExtension);
    fs.writeFileSync(filePath, fileNewBuffer);
    const response = await mammoth.convertToHtml({ path: filePath });
    console.log({ response });
    const pageHtml = response.value;
    console.log({ pageHtml });
    return null;
    // if (!file) {
    //   throw new Error('Invalid input data: missing "file" property');
    // }

    // const fileIds = [file] ?? [];

    // await prisma.document.updateMany({
    //   where: { url: { in: fileIds } },
    //   data: {
    //     status: 'syncing'
    //   }
    // });

    // // TODO: How do we distinguish files from each other if the names could collide?
    // const fileRecordsRaw = (await fileLoader.loadMany(fileIds)) as string[];
    // const fileRecords = await Promise.all(
    //   fileIds.map(async (file, index) => {
    //     const content = fileRecordsRaw[index];

    //     const webData = {
    //       id,
    //       status,
    //       title,
    //       body,
    //       content
    //     };

    //     return webData;
    //   })
    // );

    // const filteredPages = fileRecords.filter((x) => !!x?.content);

    // // console.log('filteredPages', filteredPages);
    // const vectors = await getFileRecordsVectors(filteredPages);
    // // console.log('vectorrs', vectors);

    // const embeddedVectors = await embedVectors(event, vectors);
    // return fileIds;
  }
};
