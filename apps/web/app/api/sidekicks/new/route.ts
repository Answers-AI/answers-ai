import { NextResponse } from 'next/server';
import { prisma } from '@db/client';
import { Sidekick } from 'types';
import { respond401 } from '@utils/auth/respond401';

import getCachedSession from '@ui/getCachedSession';

export async function POST(req: Request) {
  const res = new Response();

  const session = await getCachedSession(req, res);
  console.log('Session:', session);
  if (!session?.user) return respond401();

  const userId = session.user.id;

  const data: Pick<Sidekick, 'chatflow' | 'chatflowDomain' | 'chatflowApiKey'> = await req.json();

  console.log('New sidekick data', data.chatflow?.name, userId);
  try {
    if (!data.chatflow) throw new Error('No chatflow provided');
    const sidekickData = {
      ...data,
      id: data.chatflow.id,
      label: data?.chatflow?.name,
      favoritedBy: { connect: { id: userId } },
      isSharedWithOrg: true,
      tags: ['flowise']
    };
    const sidekick = await prisma.sidekick.upsert({
      where: {
        id: data.chatflow.id
      },
      create: {
        ...sidekickData,
        createdByUser: { connect: { id: userId } }
      },
      update: { ...sidekickData }
    });
    return NextResponse.json(sidekick);
  } catch (error: any) {
    console.log('[POST] error', error);
    return NextResponse.json(
      { error: 'There was an error creating your sidekick.', code: error.message },
      { status: 422 }
    );
  }
}
