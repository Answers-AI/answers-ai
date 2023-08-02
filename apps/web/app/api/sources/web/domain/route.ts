import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';
import { WebFilters } from 'types';
import { getUrlDomain } from '@utils/getUrlDomain';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return respond401();

  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  const domain = getUrlDomain(url || '');

  const web: WebFilters = {
    domain: {
      sources: []
    }
  };

  const MINIMUM_DOMAIN_LENGTH = 9;

  if (domain && domain.length > MINIMUM_DOMAIN_LENGTH) {
    const groupedByRecords = await prisma.document.groupBy({
      by: ['domain', 'status'],
      _count: {
        domain: true
      },
      where: {
        source: 'web',
        domain: {
          contains: domain
        }
      }
    });

    console.log('found grouped records', groupedByRecords.length);

    const groupedData = groupedByRecords.reduce<
      Record<string, { totalCount: number; syncedCount: number }>
    >((acc, group) => {
      const { domain, status, _count } = group;
      if (!domain) return acc;

      if (!acc[domain]) {
        acc[domain] = { totalCount: 0, syncedCount: 0 };
      }

      acc[domain].totalCount += _count.domain;
      acc[domain].syncedCount += status === 'synced' ? _count.domain : 0;

      return acc;
    }, {});

    web.domain?.sources.push(
      ...Object.entries(groupedData).map(([domainKey, { totalCount, syncedCount }]) => ({
        label: domainKey,
        value: domainKey,
        status: syncedCount === totalCount ? 'synced' : 'pending',
        count: syncedCount
      }))
    );
  }

  return NextResponse.json({
    web
  });
}
