import { generatePrompt } from '@web/generatePrompt';
import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '@web/cors';

type Data = {
  prompt: string;
  pineconeData?: any;
  context?: any;
  error?: any;
};

import { Configuration, OpenAIApi } from 'openai';

const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  return new OpenAIApi(configuration);
};

export const openai = initializeOpenAI();

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);

  const { prompt, pineconeData, context } = await generatePrompt(req.body);
  res.status(200).json({ prompt, pineconeData, context });
};

export default handler;
