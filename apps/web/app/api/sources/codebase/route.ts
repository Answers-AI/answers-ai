import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { prisma } from '@db/client';

import { authOptions } from '@ui/authOptions';
import { CodebaseFilters, DocumentFilter } from 'types';

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.redirect('/auth');

  const { searchParams } = new URL(req.url);
  const repo = searchParams.get('repo');

  const groupedByRecords = await prisma.document.groupBy({
    by: ['title', 'status'],
    _count: {
      title: true
    },
    where: {
      source: 'codebase',
      ...(repo && {
        title: {
          contains: repo
        }
      }),
      permissions: { some: { organization: { users: { some: { id: session?.user?.id } } } } }
    }
  });

  const groupedData = groupedByRecords.reduce<
    Record<string, { title: string; totalCount: number; syncedCount: number }>
  >((acc, group) => {
    const { title, status, _count } = group;
    if (!title) return acc;

    if (!acc[title]) {
      acc[title] = { title, totalCount: 0, syncedCount: 0 };
    }

    acc[title].totalCount += _count.title;
    acc[title].syncedCount += status === 'synced' ? _count.title : 0;

    return acc;
  }, {});

  const sources: DocumentFilter[] = Object.entries(groupedData).map(
    ([repo, { title, totalCount, syncedCount }]) => ({
      label: repo,
      value: repo,
      status: syncedCount === totalCount ? 'synced' : 'pending',
      count: syncedCount
    })
  );

  return NextResponse.json({ sources });
}
