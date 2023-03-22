import { prisma } from 'db/dist';
import { Chat } from 'db/generated/prisma-client';
import { AnswersFilters, User } from 'types';
import { inngest } from './client';
import { EventVersionHandler } from './EventVersionHandler';

export const answersMessageSent: EventVersionHandler<{
  chat: Chat;
  filters: AnswersFilters;
  user: User;
  role: string;
  content: string;
}> = {
  v: '1',
  event: 'answers/message.sent',
  handler: async ({ event }) => {
    const { data, user } = event;
    const { role, content, chat, filters } = data;
    if (filters?.url?.length)
      await inngest.send({
        v: '1',
        ts: new Date().valueOf(),
        name: 'web/page.sync',
        user,
        data: { appSettings: user?.appSettings, urls: filters?.url }
      });

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
