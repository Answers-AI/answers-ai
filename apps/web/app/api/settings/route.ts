import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { deepmerge } from '@utils/deepmerge';
import { prisma } from 'db/dist';

import { authOptions } from '@ui/authOptions';
import { getAppSettings } from '@ui/getAppSettings';

export async function GET(req: Request, res: Response) {
  const appSettings = await getAppSettings();
  return NextResponse.json(appSettings);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.redirect('/auth');
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    },
    include: { organization: true }
  });
  if (user) {
    const newSettings = await request.json();

    const appSettings = deepmerge({}, user?.appSettings, newSettings);
    // TODO: Validate user has org update access
    // TODO: REMOVE THIS AFTER ENABLING USER SETTINGS
    // if (user.organization) {
    //   await prisma.organization.update({
    //     where: { id: user.organization.id },
    //     data: { appSettings }
    //   });
    // } else {
    await prisma.user.update({
      where: { email: session?.user?.email },
      data: { appSettings }
    });
    // }
    return NextResponse.json({ appSettings });
  }
}
