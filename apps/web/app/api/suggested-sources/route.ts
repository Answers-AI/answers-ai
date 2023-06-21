import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import OpenAIClient from '@utils/openai/openai';
import { parse } from 'url';
import { pineconeQuery } from '@utils/pinecone/pineconeQuery';

const openai = new OpenAIClient();
const SCORE_THRESHOLD = 0.8;

export async function GET(req: Request, res: Response) {
  const { user } = (await getServerSession(authOptions)) ?? {};
  if (!user?.email) return NextResponse.redirect('/auth');
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const query = searchParams.get('query');
  let pineconeDomains: any = {};
  if (query) {
    const queryEmbedding = await openai.createEmbedding({
      input: query?.toLowerCase(),
      model: 'text-embedding-ada-002'
    });
    const webSuggestions = await getWebSuggestions(queryEmbedding, pineconeDomains);

    const otherSources = await pineconeQuery(queryEmbedding, {
      // TODO: Figure how to filter by namespace without having to re-index per user
      // namespace: `org-${user?.organizationId}`,
      namespace: `org-${user?.organizationId}`,
      topK: 200
    });
    const suggestions: any = {
      web: webSuggestions
    };
    for (const match of otherSources?.matches ?? []) {
      if (match.score! > SCORE_THRESHOLD) {
        const source = (match?.metadata as any)?.source;
        suggestions[source] = (suggestions[source] || []).concat(match?.metadata);
      }
    }
    return NextResponse.json(suggestions);
  }
}

interface DomainInfo {
  domain: string;
  pageCount: number;
}

async function getWebSuggestions(queryEmbedding: number[], pineconeDomains: any) {
  const { matches } = await pineconeQuery(queryEmbedding, {
    // TODO: Figure how to filter by namespace without having to re-index per user
    // namespace: `org-${user?.organizationId}`,
    filter: {
      source: 'web'
    },
    topK: 100
  });
  const url = new Set();
  for (const match of matches ?? []) {
    if (match.score! > SCORE_THRESHOLD) {
      const domain = (match?.metadata as any)?.domain;
      if (domain) pineconeDomains[domain] = Math.max(match.score!, pineconeDomains[domain] || 0);
      url.add((match?.metadata as any)?.url);
    }
  }
  const domain = Object.keys(pineconeDomains)
    .map((domain) => ({
      domain,
      score: pineconeDomains[domain]
    }))

    ?.filter((a) => a.score > SCORE_THRESHOLD)
    ?.sort((a, b) => b.score - a.score)

    ?.map((domain) => domain.domain);
  // @ts-expect-error
  return { domain, url: [...url] };
}

function countPagesByDomain(urls: string[]): DomainInfo[] {
  const domainMap: Map<string, number> = new Map();

  for (const url of urls) {
    const parsedUrl = parse(url);
    if (parsedUrl && parsedUrl.hostname) {
      const domain = parsedUrl.hostname;
      const count = domainMap.get(domain) || 0;
      domainMap.set(domain, count + 1);
    }
  }

  const domainInfoList: DomainInfo[] = [];
  domainMap.forEach((pageCount, domain) => {
    domainInfoList.push({ domain, pageCount });
  });

  return domainInfoList;
}
