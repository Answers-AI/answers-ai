import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';

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
      id: true,
      url: true,
      title: true,
      status: true
    },
    take: 100
  });

  const sources = filteredRecords?.map((record) => ({ ...record, repo: record.title }));

  return NextResponse.json({ sources });
}
