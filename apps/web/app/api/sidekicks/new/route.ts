import { NextResponse } from 'next/server';
import { prisma } from '@db/client';
import { User } from 'types';
import { respond401 } from '@utils/auth/respond401';

import { authenticateApiKey } from '@utils/auth/authenticateApiKey';

export async function POST(req: Request) {
  const result = (await authenticateApiKey(req)) as { user: User };

  if (!result) return respond401();

  const userId = result?.user?.id;

  const data: { chatflow: { id: string; name: string } } = await req.json();

  try {
    const sidekick = await prisma.sidekick.upsert({
      where: {
        id: data.chatflow.id
      },
      create: {
        ...(data as any),
        id: data.chatflow.id,
        label: data?.chatflow?.name,
        favoritedBy: { connect: { id: userId } },
        createdByUser: { connect: { id: userId } },
        isSharedWithOrg: true
      },
      update: { chatflow: data.chatflow as any }
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
