import { Inngest } from 'inngest';
import type { NextApiRequest, NextApiResponse } from 'next';
import cors from '../../../src/cors';

const inngest = new Inngest({ name: 'My App' });
const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await cors(req, res);
  // Chunk projects into batches of 10
  inngest.send({
    name: 'SYNCED_SLACK',
    data: {}
  });
  res.status(200).json({});
};

export default handler;
