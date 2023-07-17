import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { inngest } from '@utils/ingest/client';

import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextResponse) {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  const data = await req.json();

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'file/markdown.index',
    user,
    data
  });

  return NextResponse.json({ status: 'ok' });
}
