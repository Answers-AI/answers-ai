// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { authenticateUser, respond401 } from './utils';

export async function POST(req: Request, res: Response) {
  const user = await authenticateUser(req, res);

  if (!user) return respond401();

  return NextResponse.json({
    name: user?.name
  });
}
