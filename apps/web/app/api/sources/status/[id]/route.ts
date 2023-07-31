import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return respond401();

  if (!id) {
    return NextResponse.json({ error: 'A document ID was not provided' }, { status: 422 });
  }

  const document = await prisma.document.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      status: true
    }
  });

  return NextResponse.json({ status: document.status });
}
