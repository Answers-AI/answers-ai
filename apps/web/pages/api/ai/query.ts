import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { Message } from 'types';
import { prisma } from 'db/dist';
import cors from '@ui/cors';
import { inngest } from '@utils/ingest/client';
import { authOptions } from '@ui/authOptions';
import { createChatChain } from '@utils/llm/chains';
import { upsertChat } from '@ui/chat/upsertChat';
import { fetchContext } from '@utils/pinecone/fetchContext';

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

  const { journeyId, chatId, filters, content: prompt, isNewJourney } = req.body;
  // console.log('Query', { journeyId, chatId, isNewJourney, filters, prompt, messages });
  // TODO: Validate the user is in the chat or is allowed to send messages
  const chat = await upsertChat({
    id: chatId,
    email: user?.email,
    filters: filters,
    isNewJourney,
    prompt,
    journeyId
  });

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'answers/message.sent',
    user: user,
    data: { role: 'user', chat, content: prompt }
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
  let pineconeData,
    context = '',
    summary = '';
  try {
    ({ pineconeData, context, summary } = await fetchContext({
      chat,
      prompt,
      messages,
      filters
    }));
    // console.log({ pineconeData, context, summary });
  } catch (pineconeError) {
    console.log('Pinecone error', pineconeError);
  }

  try {
    console.time('[ChatCompletion]: ' + prompt);

    const chatChain = createChatChain({ messages });
    const response = await chatChain.call({
      context: summary,
      userName: user.name,
      input: prompt,
      history: messages,
      agent_scratchpad: ''
    });
    const answer = response.text;
    console.timeEnd('[ChatCompletion]: ' + prompt);
    let message;
    if (prompt && answer) {
      message = await prisma.message.create({
        data: {
          chat: { connect: { id: chat.id } },
          role: 'assistant',
          content: answer
        }
      });
      await inngest.send({
        v: '1',
        ts: new Date().valueOf(),
        name: 'answers/prompt.answered',
        user: user,
        data: { message, prompt }
      });
    }
    res.status(200).json({
      ...message,
      chat,
      prompt,
      context,
      summary,
      filters,
      role: 'assistant',
      content: answer,
      pineconeData,
      completionData
    });
  } catch (error: any) {
    console.log('QueryError');
    console.error(error);
    if (error.response) {
      const { data } = error.response;
      res.status(500).json({ prompt, error } as any);
    } else {
      res.status(500).json({ prompt, error });
    }
  }
};

export default handler;
