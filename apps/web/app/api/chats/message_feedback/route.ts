// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';

export async function POST(req: Request, res: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return respond401();
  const { messageId, rating, content = '', tags } = await req.json();

  const message = await prisma.message.findFirst({
    where: {
      id: messageId
    }
  });

  if (message) {
    const feedback = await prisma.messageFeedback.upsert({
      where: {
        id: messageId
      },
      create: {
        id: messageId,
        content,
        rating,
        tags,
        message: {
          connect: {
            id: messageId
          }
        }
      },
      update: {
        ...{ content, rating, tags }
      }
    });
    return NextResponse.json(feedback);
  }
  return NextResponse.json({});
}
