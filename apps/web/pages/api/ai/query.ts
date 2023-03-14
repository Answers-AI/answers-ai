import { generatePrompt } from '../../../src/generatePrompt';
import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '../../../src/cors';

type Data = {
  prompt: string;
  response?: any;
  error?: any;
};

import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi
} from 'openai';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from 'db/dist';
import { inngest } from '../../../src/ingestClient';
import { Message } from 'types';

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
  // TODO: Extract into createCompletion

  if (!session?.user?.email) {
    res.status(401);
    return;
  }

  let completionData;
  let completionMessages: ChatCompletionRequestMessage[];
  // GEt last item from messages
  const messages: { role: ChatCompletionRequestMessageRoleEnum; content: string }[] =
    req.body.messages;

  let chatId = req.body.chatId;

  // TODO: Validate the user is in the chat or is allowed to send messages
  let chat;
  if (!chatId) {
    chat = await prisma.chat.create({
      data: {
        users: {
          connect: {
            email: session.user.email
          }
        },
        prompt: {
          connect: {
            content: req.body.prompt
          }
        }
      }
    });
  } else {
    chat = await prisma.chat.findUnique({
      where: { id: chatId }
    });
  }

  if (!chat) throw new Error('Chat not found');

  const prompt = req.body.prompt;
  const filters = req.body.filters || {};

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'answers/message.sent',
    user: session.user,
    data: { role: 'user', chat, content: prompt, filters, messages }
  });

  const {
    prompt: finalPrompt,
    pineconeData,
    context
  } = await generatePrompt({ chat, prompt, messages, filters }, session?.user);

  try {
    try {
      console.time('OpenAI->createCompletion');
      completionMessages = [
        ...messages?.map(({ role, content }) => ({ role, content })),
        { role: 'user', content: finalPrompt }
      ];
      // console.log('OpenAI->createCompletion', { completionMessages });
      // TODO: Move this to app settings or feature flag
      const { data } = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: completionMessages,
        max_tokens: 700,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
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
    const answer = completionData.choices[0]?.message;

    if (prompt && answer) {
      await inngest.send({
        v: '1',
        ts: new Date().valueOf(),
        name: 'answers/prompt.answered',
        user: session.user,
        data: { chat, messages, prompt, answer }
      });
    }
    res.status(200).json({
      chat,
      prompt: finalPrompt,
      role: 'assistant',
      content: answer?.content,
      context,
      pineconeData,
      completionData,
      filters
    } as any);
  } catch (error: any) {
    console.log('Error', error);
    // Check if the error is a response error
    if (error.response) {
      // Get the error message and status code from the response
      const { message, status, data } = error.response;

      res.status(500).json({ prompt: finalPrompt, error: data } as any);
    } else {
      res.status(500).json({ prompt: finalPrompt, error });
    }
  }
};

export default handler;
