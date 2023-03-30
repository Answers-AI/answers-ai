import { getAppSettings } from '@ui/getAppSettings';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@ui/authOptions';
import { inngest } from '@utils/ingest/client';

export async function POST() {
  const appSettings = await getAppSettings();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'openapi/app.sync',
    user,
    data: { appSettings }
  });
}
