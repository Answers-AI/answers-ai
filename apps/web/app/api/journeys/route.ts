// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';

export async function GET(req: Request, res: Response) {
  const user = await getServerSession(authOptions);
  if (!user?.user?.email) return NextResponse.redirect('/auth');
  const records = await prisma.journey.findMany({
    where: {
      users: {
        some: {
          email: user?.user?.email
        }
      }
    }
  });
  return NextResponse.json(records);
}

export async function DELETE(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const user = await getServerSession(authOptions);
  if (!user?.user?.email) return NextResponse.redirect('/auth');
  if (id) {
    const userRecord = await prisma.journey.findFirst({
      where: {
        id,
        users: { some: { email: user?.user?.email } }
      }
    });

    if (!userRecord) return NextResponse.redirect('/auth');
    await prisma.journey.delete({
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
    // TODO: Validate user ownership or permisson scope
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.redirect('/auth');
    const { id, ...data } = await req.json();

    const journey = id
      ? await prisma.journey.update({
          where: {
            id
          },
          data: { ...data, users: { connect: { email: session?.user?.email } } }
        })
      : await prisma.journey.create({
          data: { ...data, users: { connect: { email: session?.user?.email } } }
        });
    return NextResponse.json(journey);
  } catch (error) {
    console.log('[PATCH] error', error);
    throw error;
  }
}
