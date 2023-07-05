// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { Chat } from 'types';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<Chat>> {
  const user = await getServerSession(authOptions);
  const id = params.id;

  const [record] = await prisma.chat.findMany({
    where: {
      id,
      users: { some: { email: user?.user?.email } }
    },
    include: {
      journey: { select: { id: true, title: true } },
      users: { select: { id: true, name: true, email: true } },
      prompt: true,
      messages: {
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  });
  return NextResponse.json(record as any);
}
