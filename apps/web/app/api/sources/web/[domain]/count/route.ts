import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';

export async function GET(req: Request, { params: { domain } }: { params: { domain: string } }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return respond401();

  if (!domain) {
    return NextResponse.json({ error: 'A domain was not provided' }, { status: 422 });
  }

  const count = await prisma.document.count({
    where: {
      domain,
      status: 'synced'
    }
  });

  return NextResponse.json({ count });
}
