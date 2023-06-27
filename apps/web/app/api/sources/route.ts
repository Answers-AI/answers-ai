import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import OpenAIClient from '@utils/openai/openai';

const openai = new OpenAIClient();
export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.redirect('/auth');
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const source = searchParams.get('source');

  // TODO: Ensure this only shows documents are owned by the user
  // For now only access to web which is """public"""
  const filteredRecords = await prisma.document.findMany({
    where: {
      source: source ?? 'web',
      ...(url && {
        url: {
          contains: url
        }
      }),
      ...(source && {
        permissions: { some: { organization: { users: { some: { id: session?.user?.id } } } } }
      })
    },
    take: 100
  });

  const allWeb = url
    ? await prisma.document
        .findMany({
          where: {
            source: 'web'
          }
        })
        .then((records) =>
          records
            ?.filter(({ domain }) => !!domain)
            ?.filter(({ domain }) => filteredRecords?.some(({ domain: d }) => d === domain))
        )
    : [];
  const domains = countPagesByDomain(allWeb?.map((x) => x.url));
  const sources = filteredRecords?.map(({ url, title }) => ({ url, title, repo: title }));

  return NextResponse.json({
    sources,
    domains
  });
}

import { parse } from 'url';

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
      const count = domainMap.get(`https://${domain}`) || 0;
      domainMap.set(`https://${domain}`, count + 1);
    }
  }

  const domainInfoList: DomainInfo[] = [];
  domainMap.forEach((pageCount, domain) => {
    domainInfoList.push({ domain, pageCount });
  });

  return domainInfoList;
}
