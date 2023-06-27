// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { authenticateUser, respond401 } from '../utils';
import { inngest } from '@utils/ingest/client';

export async function POST(req: Request, res: Response) {
  const user = await authenticateUser(req, res);

  if (!user) return respond401();

  const data = await req.json();

  // loop through these and return an error if any are missing
  const keys = ['repo', 'text', 'filePath'];

  for (const key of keys) {
    if (!data?.[key]) {
      return NextResponse.json(
        { error: `No ${key} in body` },
        {
          status: 400
        }
      );
    }
  }

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'alpha42/repo.sync',
    user,
    data
  });

  return NextResponse.json({ status: 'ok' });
}
