import { getAppSettings } from '@ui/getAppSettings';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@ui/authOptions';
import { inngest } from '@utils/ingest/client';
import { NextResponse } from 'next/server';

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
  return NextResponse.json({ success: 'true' });
}
