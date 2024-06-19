import { NextResponse } from 'next/server';
import getCachedSession from '@ui/getCachedSession';
import { findSidekicksForChat } from '@utils/findSidekicksForChat';

export async function GET(req: Request) {
  const session = await getCachedSession();

  const user = session?.user;
  const sidekicks = await findSidekicksForChat(user);

  return NextResponse.json(sidekicks);
}
