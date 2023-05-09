import { NextApiRequest, NextApiResponse } from 'next';

const healthCheck = (req: NextApiRequest, res: NextApiResponse) => {
  return res.send('ok');
};

export default healthCheck;
