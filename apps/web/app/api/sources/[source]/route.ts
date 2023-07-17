import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import OpenAIClient from '@utils/openai/openai';
import { respond401 } from '@utils/auth/respond401';
import { getUrlDomain } from '@utils/getUrlDomain';

const openai = new OpenAIClient();

interface DomainInfo {
  domain: string;
  pageCount: number;
}

const countPagesByDomain = (urls: string[]): DomainInfo[] => {
  const domainMap: Map<string, number> = urls.reduce((map, url) => {
    const parsedUrl = getUrlDomain(url);
    if (parsedUrl) {
      const count = map.get(parsedUrl) || 0;
      map.set(parsedUrl, count + 1);
    }
    return map;
  }, new Map<string, number>());

  return Array.from(domainMap, ([domain, pageCount]) => ({ domain, pageCount }));
};

export async function GET(req: Request, { params: { source } }: { params: { source: string } }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return respond401();

  if (!source) {
    return NextResponse.json({ error: 'A source was not provided' }, { status: 422 });
  }

  const filteredRecords = await prisma.document.findMany({
    where: {
      source,
      permissions: { some: { organization: { users: { some: { id: userId } } } } }
    },
    select: {
      url: true,
      title: true
    },
    take: 100
  });

  const sources = filteredRecords?.map(({ url, title }) => ({ url, title, repo: title }));

  return NextResponse.json({ sources });
}
