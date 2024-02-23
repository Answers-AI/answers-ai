import { NextResponse } from 'next/server';
import { prisma } from '@db/client';
import { Sidekick, User } from 'types';
import { respond401 } from '@utils/auth/respond401';

import { authenticateApiKey } from '@utils/auth/authenticateApiKey';

export async function POST(req: Request) {
  const result = (await authenticateApiKey(req)) as { user: User };

  if (!result) return respond401();

  const userId = result.user.id;

  const data: Pick<Sidekick, 'chatflow' | 'chatflowDomain' | 'chatflowApiKey'> = await req.json();

  console.log('New sidekick data', data);
  try {
    if (!data.chatflow) throw new Error('No chatflow provided');
    const sidekick = await prisma.sidekick.upsert({
      where: {
        id: data.chatflow.id
      },
      create: {
        ...data,
        id: data.chatflow.id,
        label: data?.chatflow?.name,
        favoritedBy: { connect: { id: userId } },
        createdByUser: { connect: { id: userId } },
        isSharedWithOrg: true
      },
      update: { ...data }
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
