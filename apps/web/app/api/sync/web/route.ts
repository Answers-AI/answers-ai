import { getAppSettings } from 'getAppSettings';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { inngest } from '../../../../src/ingestClient';

interface RequestBody {
  url: string;
}

export async function POST(req: Request) {
  const appSettings = await getAppSettings();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const { url } = await req.json();

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'web/page.sync',
    user,
    data: { appSettings, urls: [url] }
  });
}
