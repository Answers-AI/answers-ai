import { getAppSettings } from 'getAppSettings';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { inngest } from '../../../../src/ingestClient';

export async function POST() {
  const appSettings = await getAppSettings();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  inngest.send({
    name: 'jira/app.sync',
    user,
    data: { appSettings }
  });
}
