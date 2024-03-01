import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';

import { normalizeSidekickList } from '../../../../../utilities/normalizeSidekick';
import { Sidekick } from 'types';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.redirect('/auth');

    const user = session.user;
    const userId = user.id;

    const dbSidekicks = await prisma.sidekick.findMany({
      where: {
        OR: [
          {
            createdByUser: {
              organizations: {
                // User attached to the sidekick is in the same organization as the current user
                some: { users: { some: { id: userId } } }
              }
            },
            isSharedWithOrg: true
          }
        ]
      },
      include: {
        favoritedBy: {
          where: {
            id: { in: [user.id] }
          }
        }
      }
    });

    const sidekicks = normalizeSidekickList(dbSidekicks as Sidekick[], user);

    return NextResponse.json(sidekicks);
  } catch (error) {
    console.log('[GET] error', error);
    throw error;
  }
}
