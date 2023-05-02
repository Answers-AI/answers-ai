import { getServerSession } from 'next-auth';
import { AnswersFilters, Message, User } from 'types';
import { prisma } from '@db/client';
import { OpenAIStream } from '@utils/OpenAIStream';
import cors from '@ui/cors';
import { getCompletionRequest } from '@utils/llm/getCompletionRequest';
import { inngest } from '@utils/ingest/client';
import { fetchContext } from '@utils/pinecone/fetchContext';
import { authOptions } from '@ui/authOptions';
import { NextApiRequest, NextApiResponse } from 'next';
import { upsertChat } from '@utils/upsertChat';

interface QueryRequest {
  journeyId?: string;
  chatId?: string;
  prompt: string;
  messages: Message[];
  filters: AnswersFilters;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  let user: User | undefined;
  try {
    const session = await getServerSession(req, res, authOptions);
    user = session?.user;
  } catch (err) {
    console.error(err);
  }
  if (!user?.email) {
    return Response.redirect('/', 401);
  }
  const { journeyId, chatId, filters, prompt, messages } = req.body as QueryRequest;
  let completionData, completionRequest;

  console.log('[AI][Stream]', { journeyId, chatId, filters, prompt, messages });
  // TODO: Validate the user is in the chat or is allowed to send messages
  const chat = await upsertChat({
    id: chatId,
    email: user?.email,
    filters: filters,
    prompt,
    journeyId
  });

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'answers/message.sent',
    user: user,
    data: { role: 'user', chatId: chat.id, content: prompt }
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
    pineconeFilters,
    context = '',
    summary = '';
  try {
    ({ pineconeFilters, pineconeData, context, summary } = await fetchContext({
      user,
      prompt,
      messages,
      filters
    }));
    // console.log({ pineconeData, context, summary });
  } catch (contextError) {
    console.log('fetchContext', contextError);
    throw contextError;
  }
  const handleResponse = async (response: any) => {

    const answer = response.text;
    completionRequest = response.completionRequest;

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
        data: { chatId, message, prompt }
      });
    }
  };

  completionRequest = getCompletionRequest({
    context: summary,
    input: prompt,
    messages
  });

  const stream = await OpenAIStream(
    {
      ...completionRequest,
      stream: true
    },
    { filters: pineconeFilters, pineconeData, context, summary, completionRequest },
    handleResponse
  );
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');

  //@ts-expect-error
  for await (const chunk of stream) {
    var string = new TextDecoder().decode(chunk);
    res.write(string);
  }
  res.end();
};

export default handler;
