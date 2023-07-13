import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { normalizeSidekickList } from '../../../../../utilities/normalizeSidekick';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.redirect('/auth');

    const dbSidekicks = await prisma.sidekick.findMany({
      where: {
        isGlobal: true
      }
    });

    const sidekicks = normalizeSidekickList(dbSidekicks);

    return NextResponse.json(sidekicks);
  } catch (error) {
    console.log('[GET] error', error);
    throw error;
  }
}
