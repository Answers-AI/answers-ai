import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.redirect('/auth');
    const data = await req.json();

    const sidekick = await prisma.sidekick.create({
      data: { ...data, user: { connect: { email: session?.user?.email } } }
    });

    return NextResponse.json(sidekick);
  } catch (error) {
    console.log('[POST] error', error);
    throw error;
  }
}

export async function GET(req: Request, res: Response) {
  try {
    console.log('HELLO BRADLEY');
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.redirect('/auth');
    debugger;
    // const { id } = req?.query;

    if (false) {
      const sidekick = await prisma.sidekick.findUnique({
        where: { id: Number(id) }
      });

      if (!sidekick) {
        return NextResponse.json({ error: 'Sidekick not found' });
      }

      return NextResponse.json(sidekick);
    } else {
      const sidekicks = await prisma.sidekick.findMany();
      console.log('sidekicks', sidekicks);
      return NextResponse.json(sidekicks);
    }
  } catch (error) {
    console.log('[GET] error', error);
    throw error;
  }
}
