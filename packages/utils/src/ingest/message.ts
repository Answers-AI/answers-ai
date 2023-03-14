import { prisma } from 'db/dist';
import { Chat } from 'db/generated/prisma-client';
import { EventVersionHandler } from './EventVersionHandler';

export const answersMessageSent: EventVersionHandler<{
  chat: Chat;
  role: string;
  content: string;
}> = {
  v: '1',
  event: 'answers/message.sent',
  handler: async ({ event }) => {
    const { data, user } = event;
    const { role, content, chat } = data;

    return prisma.message.create({
      data: {
        ...(role == 'user' && user?.email ? { user: { connect: { email: user?.email } } } : {}),
        chat: { connect: { id: chat.id } },
        role,
        content: content
      }
    });
  }
};
