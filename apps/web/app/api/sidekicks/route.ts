import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { Sidekick } from 'types';
import { respond401 } from '@utils/auth/respond401';

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return respond401();
  }

  const { temperature, frequency, presence, maxCompletionTokens, sharedWith, ...data } =
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

  let sidekick;
  try {
    sidekick = await prisma.sidekick.create({
      data: {
        ...data,
        ...sliderValues,
        favoritedBy: { connect: { email: session?.user?.email } },
        createdByUser: { connect: { email: session?.user?.email } }
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
