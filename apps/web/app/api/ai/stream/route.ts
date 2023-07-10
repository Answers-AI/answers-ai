import { getServerSession } from 'next-auth';

import { OpenAIStream } from '@utils/OpenAIStream';
import { inngest } from '@utils/ingest/client';
import { getCompletionRequest } from '@utils/llm/getCompletionRequest';
import { fetchContext } from '@utils/pinecone/fetchContext';
import { upsertChat } from '@utils/upsertChat';

import { prisma } from '@db/client';

import { authOptions } from '@ui/authOptions';

import { Document } from 'types';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user!;
  if (!user?.email) {
    return Response.redirect('/', 401);
  }

  const { journeyId, chatId, filters, prompt, messages, sidekick, gptModel } = await req.json();
  // TODO: Update for sharing in the future
  const sidekickObject = !sidekick?.id
    ? null
    : await prisma.sidekick.findFirst({
        where: {
          id: sidekick.id
        }
      });

  let completionRequest;

  // console.log('[AI][Stream]', { journeyId, chatId, filters, prompt, messages, sidekick, gptModel });

  // TODO: Validate the user is in the chat or is allowed to send messages
  const chat = await upsertChat({
    id: chatId,
    user,
    filters: filters,
    prompt,
    journeyId
  });
  // await inngest.send({
  //   v: '1',
  //   ts: new Date().valueOf(),
  //   name: 'answers/message.sent',
  //   user: user,
  //   data: { role: 'user', chatId: chat.id, content: prompt, sidekick, gptModel }
  // });

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

  let pineconeData;
  let pineconeFilters;
  let context = '';
  let contextDocuments: Document[] = [];

  try {
    ({ pineconeFilters, pineconeData, context, contextDocuments } = await fetchContext({
      user,
      organization: user?.currentOrganization,
      prompt,
      messages,
      filters,
      sidekick: sidekickObject!
    }));
  } catch (contextError) {
    console.log('fetchContext', contextError);
    throw contextError;
  }

  const handleResponse = async (response: any) => {
    const answer = response.text;
    completionRequest = response.completionRequest;

    if (prompt && answer) {
      // message = await prisma.message.create({
      //   data: {
      //     chat: { connect: { id: chat.id } },
      //     role: 'assistant',
      //     content: answer,
      //     contextDocuments
      //   }
      // });
      await inngest.send({
        v: '1',
        ts: new Date().valueOf(),
        name: 'answers/prompt.answered',
        user: user,
        data: { chatId, message: response.message, prompt, contextDocuments }
      });
    }
  };

  completionRequest = await getCompletionRequest({
    context,
    user, // Add this line
    input: prompt,
    messages,
    sidekick: sidekickObject!,
    gptModel
  });

  const stream = await OpenAIStream(
    {
      ...completionRequest,
      stream: true
    },
    {
      user,
      chat: chat as any,
      contextDocuments,
      filters: pineconeFilters,
      context,
      ...(process.env.NODE_ENV === 'development' && {
        pineconeData,
        completionRequest
      })
    },
    handleResponse
  );

  return new Response(stream, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
