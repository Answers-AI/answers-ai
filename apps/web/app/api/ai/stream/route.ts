import { getAppSettings } from '@ui/getAppSettings';
import { User, getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
// import { syncFromAirtable } from '@utils/ingest/airtable';
import { NextResponse } from 'next/server';
import { QueryRequest } from '@pinecone-database/pinecone';
import { OpenAIStream } from '@utils/OpenAIStream';
import { inngest } from '@utils/ingest/client';
import { getCompletionRequest } from '@utils/llm/getCompletionRequest';
import { fetchContext } from '@utils/pinecone/fetchContext';
import { sidekicks } from '@utils/sidekicks';
import { upsertChat } from '@utils/upsertChat';
import { prisma } from '@db/client';
import { Sidekicks } from 'types';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user!;
  if (!user?.email) {
    return Response.redirect('/', 401);
  }

  const { journeyId, chatId, filters, prompt, messages, sidekick, gptModel } = await req.json();

  let completionData, completionRequest;

  console.log('[AI][Stream]', { journeyId, chatId, filters, prompt, messages, sidekick, gptModel });

  // Get the chosen sidekick and its getContextFunction
  const sidekicksArray: Sidekicks = sidekicks;
  const sidekickValue = sidekick || 'default';
  const sidekickObject = sidekicksArray.find((sidekick) => sidekick.value === sidekickValue);

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
    data: { role: 'user', chatId: chat.id, content: prompt, sidekick, gptModel }
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
    contextSourceFilesUsed: string[] = [];
  try {
    ({ pineconeFilters, pineconeData, context, contextSourceFilesUsed } = await fetchContext({
      user,
      prompt,
      messages,
      filters,
      sidekick: sidekickObject
    }));
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
          content: answer,
          contextSourceFilesUsed
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

  completionRequest = await getCompletionRequest({
    context,
    user, // Add this line
    input: prompt,
    messages,
    sidekick: sidekickObject,
    gptModel
  });

  const stream = await OpenAIStream(
    {
      ...completionRequest,
      stream: true
    },
    {
      chat,
      contextSourceFilesUsed,
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
