import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';
import { DocumentFilter, StandardDocumentUrlFilters } from 'types';

export async function GET(req: Request, { params: { source } }: { params: { source: string } }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return respond401();

  if (!source) {
    return NextResponse.json({ error: 'A source was not provided' }, { status: 422 });
  }

  const { searchParams } = new URL(req.url);
  const input = searchParams.get('input');

  const filteredRecords = await prisma.document.findMany({
    where: {
      source,
      ...(input && {
        title: {
          contains: input
        }
      }),
      permissions: { some: { organization: { users: { some: { id: userId } } } } }
    },
    select: {
      id: true,
      url: true,
      title: true,
      status: true
    },
    take: 100
  });

  const sources: DocumentFilter[] = filteredRecords.map((document) => ({
    documentId: document.id,
    label: document.title || document.url,
    value: document.url,
    status: document.status,
    count: 1
  }));

  return NextResponse.json({
    sources
  });
}
