import { prisma } from 'db/dist';
import { Chat } from 'db/generated/prisma-client';
import { Message } from 'types';

import { EventVersionHandler } from './EventVersionHandler';

export const answersPromptUpserted: EventVersionHandler<{ prompt: string; chat: Chat }> = {
  v: '1',
  event: 'answers/prompt.upserted',
  handler: async ({ event }) => {
    const { data, user, ts } = event;
    const { prompt } = data;
    if (!user?.email) throw new Error('No user');
    const savedPrompt = await prisma.prompt.findUnique({ where: { content: data?.prompt } });
    await prisma.prompt.upsert({
      where: { content: data?.prompt },
      create: {
        chat: { connect: { id: data?.chat?.id } },
        users: { connect: { email: user?.email } },
        content: prompt,
        likes: 0,
        usages: 1,
        createdAt: new Date(ts)
      },
      update: {
        usages: (savedPrompt?.usages || 0) + 1
      }
    });
  }
};

export const answersPromptAnswered: EventVersionHandler<{
  messages: Message[];
  chat: Chat;
  prompt: string;
  answer: Message;
}> = {
  v: '1',
  event: 'answers/prompt.answered',
  handler: async ({ event }) => {
    const {
      ts,
      data: { prompt, answer, chat }
    } = event;

    const answerMessage = await prisma.message.create({
      data: {
        content: answer.content,
        prompt: { connect: { content: prompt } },
        chat: { connect: { id: chat.id } },
        createdAt: new Date(ts)
      }
    });

    await prisma.prompt.update({
      where: { content: prompt },
      data: {
        answers: {
          connect: { id: answerMessage.id }
        }
      }
    });
  }
};
