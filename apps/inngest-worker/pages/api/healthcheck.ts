import { NextApiRequest, NextApiResponse } from 'next';

const healthCheck = (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Healthcheck');
  return res.send('ok');
};

export default healthCheck;
