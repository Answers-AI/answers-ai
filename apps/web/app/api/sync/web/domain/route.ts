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

  const { domain } = await req.json();

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'web/urls.sync',
    user,
    data: { appSettings, urls: [domain], byDomain: true }
  });

  const [totalCount, syncedCount] = await Promise.all([
    await prisma.document.count({
      where: {
        domain,
        source: 'web',
        status: {
          not: 'error'
        }
      }
    }),
    await prisma.document.count({
      where: {
        source: 'web',
        domain,
        status: 'synced'
      }
    })
  ]);

  const filter: DocumentFilter = {
    label: domain,
    value: domain,
    count: syncedCount,
    status: syncedCount === totalCount ? 'synced' : 'pending'
  };

  return NextResponse.json(filter);
}
