import { getServerSession } from 'next-auth/next';
import { authOptions } from '@ui/authOptions';
import { inngest } from '@utils/ingest/client';
import { NextResponse } from 'next/server';

export async function POST() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'auth/settings.sync',
    user,
    data: { user }
  });
  return NextResponse.json({ success: 'true' });
}
