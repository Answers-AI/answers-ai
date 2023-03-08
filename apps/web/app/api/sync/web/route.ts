import { getAppSettings } from 'getAppSettings';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { inngest } from '../../../../src/ingestClient';

interface RequestBody {
  url: string;
}

export async function POST(req: { body: RequestBody }) {
  const appSettings = await getAppSettings();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { body } = req;
  const url = body.url;
  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'web/page.sync',
    user,
    data: { appSettings, url }
  });
}
