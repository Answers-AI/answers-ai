import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { prisma } from '@db/client';

import { authOptions } from '@ui/authOptions';

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.redirect('/auth');

  // TODO: Ensure this only shows documents are owned by the user
  const filteredRecords = await prisma.document.findMany({
    select: {
      id: true,
      metadata: true,
      status: true,
      title: true,
      url: true
    },
    where: {
      source: 'codebase',
      permissions: { some: { organization: { users: { some: { id: session?.user?.id } } } } }
    },
    distinct: ['title'],
    take: 100
  });

  const sources = filteredRecords.filter((s: any) => !!s?.metadata?.repo);

  return NextResponse.json({
    sources
  });
}
