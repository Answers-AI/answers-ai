import { getAppSettings } from '@ui/getAppSettings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { inngest } from '@utils/ingest/client';
import { NextResponse } from 'next/server';

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
  return NextResponse.json({ success: 'true' });
}
