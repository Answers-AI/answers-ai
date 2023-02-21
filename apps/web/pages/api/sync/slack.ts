import type { NextApiRequest, NextApiResponse } from 'next';
import { syncSlack } from 'utils';
import cors from '../../../src/cors';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await cors(req, res);
  const result = await syncSlack();
  res.status(200).json({ result });
};

export default handler;
