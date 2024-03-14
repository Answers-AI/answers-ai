import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';
import { normalizeSidekickList } from '../../../../../utilities/normalizeSidekick';
import { Sidekick } from 'types';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return respond401();

    const user = session.user;

    const dbSidekicks = await prisma.sidekick.findMany({
      where: {
        NOT: {
          tags: { has: 'chatflow' }
        },
        favoritedBy: {
          some: {
            id: user.id
          }
        }
      },
      include: {
        favoritedBy: {
          where: {
            id: { in: [user.id] }
          }
        }
      }
    });

    const sidekicks = normalizeSidekickList(dbSidekicks, user);

    return NextResponse.json(sidekicks);
  } catch (error) {
    console.log('[GET] error', error);
    throw error;
  }
}
