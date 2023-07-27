import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';
import { getUrlDomain } from '@utils/getUrlDomain';

interface DomainInfo {
  domain: string;
  pageCount: number;
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return respond401();

  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  // TODO: Ensure this only shows documents are owned by the user
  // For now only access to web which is stored in the PINECONE_INDEX_NAMESPACE env variable
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
