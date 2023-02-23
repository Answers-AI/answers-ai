import { Inngest } from 'inngest';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AppSettings } from 'types';
import { getJiraProjects } from 'utils/dist/jira';
import cors from '../../../src/cors';

const inngest = new Inngest({ name: 'My App' });
const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const response = await fetch(`http://localhost:3000/api/settings`, { cache: 'no-store' });
  const settings: AppSettings = await response.json();
  await cors(req, res);
  // Chunk projects into batches of 10
  inngest.send({
    name: 'SYNCED_JIRA',
    data: { projectKeys: settings?.jira?.projects?.filter((p) => p.enabled).map((p) => p.key) }
    // data: { projectKeys: ['DRATA', 'PROJECT', 'SUPPORT'] }
    // data: { projectKeys: ['PROJECT', 'SUPPORT', 'DRATAWEB', 'ISD', 'G2M', 'IFWEB', 'WORWEB'] }
  });
  res.status(200).json({});
};

export default handler;
