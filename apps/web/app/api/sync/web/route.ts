import { getAppSettings } from '@ui/getAppSettings';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@ui/authOptions';
import { inngest } from '@utils/ingest/client';
import { getUniqueUrls } from '@utils/utilities/getUniqueUrls';
import { NextResponse } from 'next/server';

interface RequestBody {
  url: string;
  urls?: string[];
}

export async function POST(req: Request, res: NextResponse) {
  console.time('web route');
  console.time('getAppSettings');
  const appSettings = await getAppSettings();
  console.timeEnd('getAppSettings');

  console.time('getServerSession');
  const session = await getServerSession(authOptions);
  console.timeEnd('getServerSession');

  console.time('user');
  const user = session?.user;
  console.timeEnd('user');

  const { urls, byDomain } = await req.json();
  const uniqueUrls = getUniqueUrls(urls);
  console.log({ urls, uniqueUrls, byDomain });

  inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'web/urls.sync',
    user,
    data: { appSettings, urls: uniqueUrls, byDomain: !!byDomain }
  });

  console.timeEnd('web route');
  return NextResponse.json({ status: 'ok' });
}
