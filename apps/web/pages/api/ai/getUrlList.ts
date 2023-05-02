import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import cors from '@ui/cors';
import { authOptions } from '@ui/authOptions';
import getUrlList from '@ui/chat/getUrlList';

type Data = {
  urls: string[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);

  const session = await getServerSession(req, res, authOptions);

  const user = session?.user;

  if (!user?.email) {
    res.status(401);
    return;
  }

  const { domains } = req.body;

  const params: { domains?: string[] } = {};
  if (domains) params.domains = domains;
  const urls = await getUrlList(params);

  res.status(200).json({ urls: urls.map((u) => u.url) });
};

export default handler;
