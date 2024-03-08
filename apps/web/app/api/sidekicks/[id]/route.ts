import { NextResponse } from 'next/server';
import getCachedSession from '@ui/getCachedSession';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getCachedSession();
    // console.log({ session });
    const userId = session?.user?.id;
    if (!userId) return respond401();
    // const flags = useFlags(['settings_stream', 'recommended_prompts_expand']);

    if (!id) {
      return NextResponse.json({ error: 'Sidekick ID not provided' });
    }

    const sidekick = await prisma.sidekick.findFirst({
      where: {
        id,
        OR: [
          { createdByUser: { id: userId } },
          { isGlobal: true },
          {
            createdByUser: {
              organizations: {
                some: { users: { some: { id: userId } } }
              }
            },
            isSharedWithOrg: true
          }
        ]
      }
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
