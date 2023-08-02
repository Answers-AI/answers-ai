import { getAppSettings } from '@ui/getAppSettings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { inngest } from '@utils/ingest/client';
import { NextResponse } from 'next/server';
import { prisma } from '@db/client';
import { respond401 } from '@utils/auth/respond401';
import { DocumentFilter } from 'types';

export async function POST(req: Request, res: NextResponse) {
  const appSettings = await getAppSettings();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return respond401();
  }

  const { url } = await req.json();

  const web = await prisma.document.upsert({
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

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'web/urls.sync',
    user,
    data: { appSettings, urls: [url], byDomain: false }
  });

  const webDocumentFilter: DocumentFilter | undefined = {
    documentId: web.id,
    label: web.url,
    value: web.url,
    status: web.status,
    count: 1
  };

  return NextResponse.json(webDocumentFilter);
}
