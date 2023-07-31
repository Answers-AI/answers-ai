import { getAppSettings } from '@ui/getAppSettings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { inngest } from '@utils/ingest/client';
import { NextResponse } from 'next/server';
import { prisma } from '@db/client';

export async function POST(req: Request, res: NextResponse) {
  const appSettings = await getAppSettings();

  const session = await getServerSession(authOptions);

  const user = session?.user;

  const { url, byDomain } = await req.json();

  let web: any;

  if (!byDomain) {
    web = await prisma.document.upsert({
      select: {
        id: true,
        title: true,
        status: true,
        url: true
      },
      where: { url },
      create: { url, source: 'web' },
      update: { url, source: 'web' }
    });
  }

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'web/urls.sync',
    user,
    data: { appSettings, urls: [url], byDomain: !!byDomain }
  });

  return NextResponse.json(
    web
      ? {
          web
        }
      : {
          web: {
            domains: [url]
          }
        }
  );
}
