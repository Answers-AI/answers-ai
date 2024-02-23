import { getServerSession } from 'next-auth';

import { prisma } from '@db/client';
import { getFlowisePredictionStream } from '@utils/FlowiseStream';
import { upsertChat } from '@utils/upsertChat';

import { authOptions } from '@ui/authOptions';
import { inngest } from '@utils/ingest/client';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user!;
    if (!user?.email) {
      return Response.redirect('/', 401);
    }

    // const activeUserPlan = await getActiveUserPlan(user);

    // const { tokensLeft: remainingTokens } = activeUserPlan;

    // if (remainingTokens <= 0) {
    //   return new Response(
    //     JSON.stringify({
    //       message: 'Plan limit exceeded',
    //       code: 'plan-limit-exceeded'
    //     }),
    //     { status: 402 }
    //   );
    // }

    const {
      journeyId,
      chatId,
      filters,
      prompt,
      messages,
      sidekick: { id: sidekickId = null } = {}
    } = await req.json();
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
    const chat = await upsertChat({
      id: chatId,
      user,
      filters: filters,
      prompt,
      journeyId,
      sidekick
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

    const stream = await getFlowisePredictionStream({
      sidekick,
      body: {
        question: prompt,
        history: messages?.map(({ content, role }: any) => ({
          message: content,
          type: role == 'assistant' ? 'apiMessage' : 'userMessage'
        }))
      }
    });
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
