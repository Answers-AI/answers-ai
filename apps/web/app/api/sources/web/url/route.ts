import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';
import { WebFilters } from 'types';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return respond401();

  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  const filteredRecords = await prisma.document.findMany({
    where: {
      source: 'web',
      ...(url && {
        url: {
          contains: url
        }
      })
    },
    select: {
      id: true,
      url: true,
      title: true,
      status: true
    },
    take: 100
  });

  const sources = filteredRecords?.map((record) => ({ ...record, repo: record.title }));

  const web: WebFilters = {
    url: {
      sources: filteredRecords.map((document) => ({
        documentId: document.id,
        label: document.url,
        value: document.url,
        status: document.status,
        count: 1
      }))
    }
  };

  return NextResponse.json({
    web
  });
}
