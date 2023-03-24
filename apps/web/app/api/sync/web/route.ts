import { getAppSettings } from '@ui/getAppSettings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { inngest } from '@utils/ingest/client';
import { getUniqueUrls } from '@utils/utilities/getUniqueUrls';
import { NextResponse } from 'next/server';

interface RequestBody {
  url: string;
  urls?: string[];
}

export async function POST(req: Request, res: NextResponse) {
  const appSettings = await getAppSettings();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const { url, urls, byDomain } = await req.json();
  const uniqueUrls = getUniqueUrls(urls);
  console.log({ uniqueUrls });
  inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'web/urls.sync',
    user,
    data: { appSettings, urls: uniqueUrls, byDomain: !!byDomain }
  });
  return NextResponse.json({ status: 'ok' });
}
