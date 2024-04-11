import { NextResponse } from 'next/server';
import getCachedSession from '@ui/getCachedSession';
import { prisma } from '@db/client';
import { normalizeSidekickList } from '../../../../../utilities/normalizeSidekick';

export async function GET(req: Request) {
  try {
    const session = await getCachedSession();
    if (!session?.user?.email) return NextResponse.redirect('/auth');

    const user = session.user;
    const userId = user.id;

    const dbSidekicks = await prisma.sidekick.findMany({
      where: {
        isGlobal: true
      },
      include: {
        favoritedBy: {
          where: {
            id: { in: [user.id] }
          }
        }
      }
    });

    const sidekicks = normalizeSidekickList(dbSidekicks as any[], user);

    return NextResponse.json(sidekicks);
  } catch (error) {
    console.log('[GET] error', error);
    throw error;
  }
}
