import { Inngest } from 'inngest';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getJiraProjects } from 'utils/dist/jira';
import cors from '../../../src/cors';

const inngest = new Inngest({ name: 'My App' });
const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await cors(req, res);
  // Chunk projects into batches of 10
  inngest.send({
    name: 'SYNC_JIRA',
    data: {}
  });
  res.status(200).json({});
};

export default handler;
