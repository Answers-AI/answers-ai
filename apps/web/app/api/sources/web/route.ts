import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
// import OpenAIClient from '@utils/openai/openai';
import { respond401 } from '@utils/auth/respond401';
import { getUrlDomain } from '@utils/getUrlDomain';

// const openai = new OpenAIClient();

interface DomainInfo {
  domain: string;
  pageCount: number;
}

// const countPagesByDomain = (urls: string[]): DomainInfo[] => {
//   const domainMap: Map<string, number> = urls.reduce((map, url) => {
//     const parsedUrl = getUrlDomain(url);
//     if (parsedUrl) {
//       const count = map.get(parsedUrl) || 0;
//       map.set(parsedUrl, count + 1);
//     }
//     return map;
//   }, new Map<string, number>());

//   return Array.from(domainMap, ([domain, pageCount]) => ({ domain, pageCount }));
// };

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return respond401();

  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  // TODO: Ensure this only shows documents are owned by the user
  // For now only access to web which is """public"""
  const filteredRecords = await prisma.document.findMany({
    where: {
      source: 'web',
      ...(url && {
        url: {
          contains: url
        }
      }),
      permissions: { some: { organization: { users: { some: { id: session?.user?.id } } } } }
    },
    select: {
      url: true,
      title: true
    },
    take: 100
  });

  let domains: DomainInfo[] = [];

  if (url) {
    const domain = getUrlDomain(url);
    if (domain) {
      const domainCount = await prisma.document.count({ where: { source: 'web', domain } });

      domains = [{ domain, pageCount: domainCount }];
    }
  }

  const sources = filteredRecords?.map(({ url, title }) => ({ url, title, repo: title }));

  return NextResponse.json({
    sources,
    domains
  });
}
