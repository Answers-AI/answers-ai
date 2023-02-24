import { generatePrompt } from '../../../src/generatePrompt';
import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '../../../src/cors';

type Data = {
  prompt: string;
  response?: any;
  error?: any;
};

import { Configuration, OpenAIApi } from 'openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const initializeOpenAI = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  return new OpenAIApi(configuration);
};

export const openai = initializeOpenAI();

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const session = await getServerSession(req, res, authOptions);

  let completionData;
  const { prompt, pineconeData, context, savedPrompt } = await generatePrompt(
    req.body,
    session?.user
  );
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

      res
        .status(500)
        .json({ prompt: prompt, error: error?.response?.data, context, pineconeData } as any);
      return;
    }
    // Get the recommended changes from the API response\
    const answer = completionData.choices[0].text;

    if (answer)
      await prisma.prompt.update({
        where: { id: savedPrompt.id },
        data: {
          answers: {
            createMany: {
              data: [{ text: answer }]
            }
          }
        }
      });

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
