import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import cors from '@ui/cors';
import { authOptions } from '@ui/authOptions';
import { getFullUrlList } from '@ui/chat/getFullUrlList';

export type SourceUrl = {
  id: string;
  domain: string;
  url: string;
};

type Data = SourceUrl[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);

  const session = await getServerSession(req, res, authOptions);

  const user = session?.user;

  if (!user?.email) {
    res.status(401);
    return;
  }

  const urls = await getFullUrlList();

  res.status(200).json(urls);
};

export default handler;
