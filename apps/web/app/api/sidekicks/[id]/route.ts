import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';

export async function PATCH(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.redirect('/auth');
    const id = req.url.substring(req.url.lastIndexOf('/') + 1);
    if (!id) {
      return NextResponse.json({ error: 'Invalid ID param' });
    }

    const { temperature, frequency, presence, maxCompletionTokens, userId, sharedWith, ...data } =
      await req.json();
    const sliderValues = {
      temperature: parseInt(temperature, 10),
      frequency: parseInt(frequency, 10),
      presence: parseInt(presence, 10),
      maxCompletionTokens: parseInt(maxCompletionTokens, 10)
    };

    switch (sharedWith) {
      case 'global': {
        data.isGlobal = true;
        break;
      }
      case 'org': {
        data.isSharedWithOrg = true;
        break;
      }
    }
    console.log({ sharedWith });

    console.log({ ...data });

    const sidekick = await prisma.sidekick.update({
      where: {
        id
      },
      data: {
        ...data,
        ...sliderValues,
        createdByUser: { connect: { email: session?.user?.email } }
      }
    });

    return NextResponse.json(sidekick);
  } catch (error) {
    console.log('[POST] error', error);
    throw error;
  }
}

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.redirect('/auth');

    if (!id) {
      return NextResponse.json({ error: 'Sidekick ID not provided' });
    }

    const sidekick = await prisma.sidekick.findUnique({
      where: { id: Number(id) }
    });

    if (!sidekick) {
      return NextResponse.json({ error: 'Sidekick not found' });
    }

    return NextResponse.json(sidekick);
  } catch (error) {
    console.log('[GET] error', error);
    throw error;
  }
}
