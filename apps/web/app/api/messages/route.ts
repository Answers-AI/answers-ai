// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from 'db/dist';
import { authOptions } from '@ui/authOptions';

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.redirect('/auth');
  const records = await prisma.message.findMany({
    where: {
      userId: session?.user?.id
    }
  });
  return NextResponse.json(records);
}

export async function DELETE(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.redirect('/auth');
  if (id) {
    const userRecord = await prisma.message.findFirst({
      where: {
        id,
        userId: session?.user?.id
      }
    });

    if (!userRecord) return NextResponse.redirect('/auth');
    await prisma.message.delete({
      where: {
        id
      }
    });
    return NextResponse.json({ id });
  }
}

export async function PATCH(req: Request, res: Response) {
  try {
    // TODO: Validate which fields are allowed to be updated
    const user = await getServerSession(authOptions);
    if (!user?.user?.email) return NextResponse.redirect('/auth');
    const { id, likes, dislikes } = await req.json();

    if (id) {
      await prisma.message.update({
        where: {
          id
        },
        data: { likes, dislikes }
      });

      return NextResponse.json({ id });
    }
  } catch (error) {
    console.log('[PATCH] error', error);
    throw error;
  }
}
