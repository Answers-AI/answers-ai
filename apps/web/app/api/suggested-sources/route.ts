import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import OpenAIClient from '@utils/openai/openai';

const openai = new OpenAIClient();
export async function GET(req: Request, res: Response) {
  const user = await getServerSession(authOptions);
  if (!user?.user?.email) return NextResponse.redirect('/auth');
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const query = searchParams.get('query');
  let pineconeSources;
  let pineconeDomains: any = {};
  if (query) {
    const queryEmbedding = await openai.createEmbedding({
      input: query?.toLowerCase(),
      model: 'text-embedding-ada-002'
    });
    const { matches } = await pineconeQuery(queryEmbedding, {
      // TODO: Figure how to filter by namespace without having to re-index per user
      // namespace: `org-${user?.organizationId}`,
      filter: {
        source: 'web'
      },
      topK: 100
    });
    if (matches) {
      for (const match of matches) {
        const domain = (match?.metadata as any)?.domain;
        if (domain) pineconeDomains[domain] = Math.max(match.score!, pineconeDomains[domain] || 0);
      }
      const domain = Object.keys(pineconeDomains)
        .map((domain) => ({
          domain,
          score: pineconeDomains[domain]
        }))
        ?.sort((a, b) => b.score - a.score)
        ?.map((domain) => domain.domain);
      return NextResponse.json({
        domain: domain

        // matches
      });
    }
  }
}

import { parse } from 'url';
import { fetchContext } from '@utils/pinecone/fetchContext';
import { pineconeQuery } from '@utils/pinecone/pineconeQuery';

interface DomainInfo {
  domain: string;
  pageCount: number;
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
