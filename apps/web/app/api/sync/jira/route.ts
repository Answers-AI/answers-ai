import { getAppSettings } from '@web/getAppSettings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@web/authOptions';
import { inngest } from '@web/ingestClient';

export async function POST(request: Request) {
  const appSettings = await getAppSettings();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { filters } = await request.json();

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'jira/app.sync',
    user,
    data: { filters, appSettings }
  });
}
