import { NextApiRequest, NextApiResponse } from 'next';

const healthCheck = (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Worker Healthy');
  return res.send('ok');
};

export default healthCheck;
