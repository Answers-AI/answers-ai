import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { Sidekick } from 'types';

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.redirect('/auth');
    const { temperature, frequency, presence, maxCompletionTokens, sharedWith, ...data } =
      await req.json();
    const sliderValues = {
      temperature: parseInt(temperature, 10),
      frequency: parseInt(frequency, 10),
      presence: parseInt(presence, 10),
      maxCompletionTokens: parseInt(maxCompletionTokens, 10)
    };

    console.log({ temperature, frequency, presence, maxCompletionTokens, sharedWith, ...data });

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

    const sidekick = await prisma.sidekick.create({
      data: {
        ...data,
        ...sliderValues,
        favoritedBy: { connect: { email: session?.user?.email } },
        createdByUser: { connect: { email: session?.user?.email } }
      }
    });

    return NextResponse.json(sidekick);
  } catch (error) {
    console.log('[POST] error', error);
    throw error;
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.redirect('/auth');

    // TODO: Only pull sidekicks for current user or isGlobal
    const dbSidekicks = await prisma.sidekick.findMany();
    const sidekicks = dbSidekicks.map((sidekick: Sidekick) => {
      if (sidekick.isGlobal) {
        sidekick.sharedWith = 'global';
      } else if (sidekick.isSharedWithOrg) {
        sidekick.sharedWith = 'org';
      } else {
        sidekick.sharedWith = 'private';
      }

      return sidekick;
    });
    return NextResponse.json(sidekicks);
  } catch (error) {
    console.log('[GET] error', error);
    throw error;
  }
}
