import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { Sidekick } from 'types';
import { respond401 } from '@utils/auth/respond401';
import { normalizeSidekickForUpdate } from 'utilities/normalizeSidekick';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return respond401();

  const userId = session.user.id;

  const data: Sidekick = await req.json();

  try {
    const normalizedSidekick: any = normalizeSidekickForUpdate(data);
    const sidekick = await prisma.sidekick.create({
      data: {
        ...normalizedSidekick,
        favoritedBy: { connect: { id: userId } },
        createdByUser: { connect: { id: userId } }
      }
    });
    return NextResponse.json(sidekick);
  } catch (error) {
    console.log('[POST] error', error);
    return NextResponse.json(
      { error: 'There was an error creating your sidekick.', code: error.message },
      { status: 422 }
    );
  }
}
