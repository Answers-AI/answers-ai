import { getAppSettings } from '@ui/getAppSettings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
// import { syncFromAirtable } from '@utils/ingest/airtable';
import { NextResponse } from 'next/server';

export async function POST() {
  const appSettings = await getAppSettings();
  const session = await getServerSession(authOptions);
  const user = session?.user;

//   await syncFromAirtable(appSettings, user);
  return NextResponse.json({ success: 'true' });
}