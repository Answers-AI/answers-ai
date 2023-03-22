// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

import { deepmerge } from '@utils/deepmerge';

import { prisma } from 'db/dist';

import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';

export async function GET(req: Request, res: Response) {
  const user = await getServerSession(authOptions);
  if (!user?.user?.email) return NextResponse.redirect('/auth');
  const records = await prisma.chat.findMany({
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
    const userRecord = await prisma.chat.findFirst({
      where: {
        id,
        users: { some: { email: user?.user?.email } }
      }
    });

    if (!userRecord) return NextResponse.redirect('/auth');
    await prisma.chat.delete({
      where: {
        id
      }
    });
    return NextResponse.json({ id });
  }
}
