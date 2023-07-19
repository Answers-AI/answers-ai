import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { Sidekick } from 'types';
import { respond401 } from '@utils/auth/respond401';
import { normalizeSidekickForUpdate } from 'utilities/normalizeSidekick';

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return respond401();

  const userId = session.user.id;

  const data: Sidekick = await req.json();
  const normalizedSidekick: any = normalizeSidekickForUpdate(data);

  let sidekick;
  try {
    sidekick = await prisma.sidekick.create({
      data: {
        ...normalizedSidekick,
        favoritedBy: { connect: { id: userId } },
        createdByUser: { connect: { id: userId } }
      }
    });
  } catch (error) {
    console.log('[POST] error', error);
    return NextResponse.json(
      { error: 'There was an error creating your sidekick.' },
      { status: 422 }
    );
  }

  return NextResponse.json(sidekick);
}
