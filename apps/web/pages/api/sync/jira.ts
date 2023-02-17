import { Configuration, OpenAIApi } from 'openai';

import type { NextApiRequest, NextApiResponse } from 'next';
import { syncJira } from 'utils';
import cors from '../../../src/cors';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await cors(req, res);
  const result = await syncJira();
  res.status(200).json({ result });
};

export default handler;
