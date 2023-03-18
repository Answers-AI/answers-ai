import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { Message } from 'types';
import cors from '@web/cors';
import { inngest } from '@web/ingestClient';
import { authOptions } from '@web/authOptions';
import { createChatChain } from '@web/llm/chatChain';
import { upsertChat } from '@web/chat/upsertChat';
import { fetchContext } from '@web/fetchContext';

type Data = {
  prompt: string;
  response?: any;
  error?: any;
  [key: string]: any;
};
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  const session = await getServerSession(req, res, authOptions);
  // TODO: Extract into createCompletion
  const user = session?.user;
  if (!user?.email) {
    res.status(401);
    return;
  }

  let completionData;

  const messages: Message[] = req.body.messages;

  const { journeyId, chatId, filters, prompt } = req.body;
  // TODO: Validate the user is in the chat or is allowed to send messages
  const chat = await upsertChat({
    id: chatId,
    email: user?.email,
    filters: filters,
    prompt,
    journeyId
  });

  if (!chat) throw new Error('Chat not found');

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'answers/message.sent',
    user: user,
    data: { role: 'user', chat, content: prompt, filters, messages }
  });
  if (user)
    await inngest.send({
      v: '1',
      ts: new Date().valueOf(),
      name: 'answers/prompt.upserted',
      user,
      data: {
        prompt,
        chat
      }
    });

  const { pineconeData, context, summary } = await fetchContext({
    chat,
    prompt,
    messages,
    filters
  });

  try {
    console.time('OpenAI->createCompletion');
    const chatChain = createChatChain({ messages });
    const response = await chatChain.call({
      context: summary || context,
      userName: user.name
    });
    const answer = response.text;

    if (prompt && answer) {
      await inngest.send({
        v: '1',
        ts: new Date().valueOf(),
        name: 'answers/prompt.answered',
        user: user,
        data: { chat, messages, prompt, answer }
      });
    }
    res.status(200).json({
      chat,
      prompt,
      context,
      summary,
      filters,
      role: 'assistant',
      content: answer?.content,
      pineconeData,
      completionData
    });
  } catch (error: any) {
    console.log('Error', error);
    if (error.response) {
      const { data } = error.response;
      res.status(500).json({ prompt, error: data } as any);
    } else {
      res.status(500).json({ prompt, error });
    }
  }
};

export default handler;
