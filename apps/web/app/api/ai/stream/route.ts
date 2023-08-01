import { getServerSession } from 'next-auth';

import { OpenAIStream } from '@utils/OpenAIStream';
import { inngest } from '@utils/ingest/client';
import { getCompletionRequest } from '@utils/llm/getCompletionRequest';
import { fetchContext } from '@utils/pinecone/fetchContext';
import { upsertChat } from '@utils/upsertChat';

import { prisma } from '@db/client';

import { authOptions } from '@ui/authOptions';

import type { Document } from 'types';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user!;
    if (!user?.email) {
      return Response.redirect('/', 401);
    }

    const {
      journeyId,
      chatId,
      filters,
      prompt,
      messages,
      sidekick: { id: sidekickId = null } = {},
      gptModel
    } = await req.json();
    // TODO: Update for sharing in the future
    const sidekick = !sidekickId
      ? null
      : await prisma.sidekick.findFirst({
          where: {
            id: sidekickId
          }
        });

    if (!sidekick) {
      return new Response('Sidekick not found', { status: 404 });
    }

    let completionRequest;

    // console.log('[AI][Stream]', { journeyId, chatId, filters, prompt, messages, sidekick, gptModel });

    // TODO: Validate the user is in the chat or is allowed to send messages
    const chat = await upsertChat({
      id: chatId,
      user,
      filters: filters,
      prompt,
      journeyId,
      sidekick
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
        organizationId: chat.organizationId ?? user.organizationId ?? '',
        user,
        organization: user?.currentOrganization,
        prompt,
        messages,
        filters,
        sidekick: sidekick!
      }));
    } catch (contextError) {
      console.log('fetchContext', contextError);
      throw contextError;
    }

    const handleStreamEnd = async (response: any) => {
      const answer = response.text;
      // console.log(response);
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
      user,
      organization: user?.currentOrganization,
      input: prompt,
      messages,
      sidekick: sidekick!,
      gptModel
    });

    const stream = await OpenAIStream(
      {
        ...completionRequest,
        stream: true
      },
      {
        sidekick,
        user,
        prompt,
        chat: chat as any,
        contextDocuments,
        filters: pineconeFilters as any,
        context,
        completionRequest,
        ...(IS_DEVELOPMENT && {
          pineconeData
        })
      },
      handleStreamEnd
    );

    return new Response(stream, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  } catch (error: any) {
    // TODO: Register Chat errors to Sentry under special tag
    return new Response(
      JSON.stringify({
        message: 'There was an error replying to your message. Please try again.',
        code: error.message
      }),
      { status: 422 }
    );
  }
}
