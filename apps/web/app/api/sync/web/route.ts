import { TextDecoder } from 'util';
import { getAppSettings } from 'getAppSettings';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { inngest } from '../../../../src/ingestClient';

interface RequestBody {
  url: string;
}

export async function POST(req: { body: ReadableStream }) {
  const appSettings = await getAppSettings();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const decoder = new TextDecoder();
  const reader = req.body.getReader();
  let url = '';
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    url += decoder.decode(value);
  }

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'web/page.sync',
    user,
    data: { appSettings, urls: [url] }
  });
}
