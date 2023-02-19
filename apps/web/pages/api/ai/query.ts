import { generatePrompt } from '../../../src/generatePrompt';
import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '../../../src/cors';

type Data = {
  prompt: string;
  response?: any;
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

  let completionData;
  const { prompt, pineconeData, context } = await generatePrompt(req.body);
  try {
    try {
      console.time('OpenAI->createCompletion');
      const { data } = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 700,
        temperature: 0
      });
      completionData = data;

      console.timeEnd('OpenAI->createCompletion');
    } catch (error: any) {
      console.log('OPENAI-ERROR', error?.response?.data);

      res.status(500).json({ prompt: prompt, error: error?.response?.data } as any);
      return;
    }
    const answer = completionData.choices[0].text;

    // Get the recommended changes from the API response

    res.status(200).json({
      prompt,
      answer,
      context,
      pineconeData,
      completionData
    } as any);
  } catch (error: any) {
    console.log('Error', error);
    // Check if the error is a response error
    if (error.response) {
      // Get the error message and status code from the response
      const { message, status, data } = error.response;

      res.status(500).json({ prompt: prompt, error: data } as any);
    } else {
      res.status(500).json({ prompt: prompt, error });
    }
  }
};

export default handler;
