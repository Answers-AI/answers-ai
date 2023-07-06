import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@db/client';
import { authOptions } from '@ui/authOptions';

export async function PATCH(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.redirect('/auth');

    const { id, ...data } = await req.json();

    console.log({ data });

    if (!session?.user?.organizationId || session?.user?.organizationId !== id)
      return NextResponse.redirect('/auth');

    const organization = await prisma.organization.update({
      where: {
        id
      },
      data: {
        id,
        ...data,
        appSettings: undefined
      }
    });

    return NextResponse.json(organization);
  } catch (error) {
    console.log('[POST] error', error);
    throw error;
  }
}
