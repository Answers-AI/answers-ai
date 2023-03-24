import { URL } from 'url';
import { confluenceClient, ConfluencePage } from './index';

const removeDuplicateHeaders = (markdown: string): string => {
  const regex = /^(#+)(.*)$/gm;
  const headers: { level: number; start: number; end: number }[] = [];

  // Find all the headers and their positions
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    headers.push({
      level: match[1].length,
      start: match.index,
      end: match.index + match[0].length
    });
  }

  // Loop through the headers and remove duplicates
  for (let i = headers.length - 1; i >= 1; i--) {
    const currentHeader = headers[i];
    const prevHeader = headers[i - 1];

    if (currentHeader.level === prevHeader.level) {
      // Check if there is non-white space content between the headers
      const content = markdown.substring(prevHeader.end, currentHeader.start);
      if (!/^\s*$/s.test(content)) {
        continue;
      }

      // Remove the previous header
      markdown = markdown.substring(0, prevHeader.start) + markdown.substring(prevHeader.end);
      headers.splice(i - 1, 1);
    }
  }

  return markdown;
};

export const getConfluencePages = async ({
  limit = 250,
  cursor = ''
}: {
  limit?: number;
  cursor?: string;
} = {}): Promise<(ConfluencePage | null)[]> => {
  console.log('===Fetching all confluence pages===');
  try {
    const endpoint = `/pages?body-format=atlas_doc_format&limit=${limit}${
      cursor ? `&cursor=${cursor}` : ''
    }`;
    const pagesResult: { results: any[]; _links: { next: string } } =
      await confluenceClient.fetchConfluenceData(endpoint, { cache: false });

    const pages = pagesResult.results.filter((page) => !!page?.body?.atlas_doc_format?.value);

    if (pagesResult._links?.next) {
      const nextCursor = new URL(pagesResult._links.next).searchParams.get('cursor');
      if (nextCursor) {
        const nextPageResults = await getConfluencePages({ limit, cursor: nextCursor });
        pages.push(...nextPageResults);
      }
    }

    return pages;
  } catch (error) {
    console.error('getConfluencePages:ERROR', error);
    throw error;
  }
};

export const getConfluencePage = async ({
  pageId
}: {
  pageId: string;
}): Promise<ConfluencePage> => {
  console.log(`===Fetching confluence page: ${pageId}`);
  try {
    const endpoint = `/pages/${pageId}?body-format=atlas_doc_format`;
    const pageData = await confluenceClient.fetchConfluenceData(endpoint, { cache: false });
    if (!pageData?.body?.atlas_doc_format?.value)
      throw new Error(`No valid data returned for id: ${pageId}`);

    return pageData;
  } catch (error) {
    console.error('getConfluencePage:ERROR', error);
    throw error;
  }
};
