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
    if (filters?.datasources?.web?.url?.length) {
      console.log('web/page.sync', filters.datasources.web.url);
      await inngest.send({
        v: '1',
        ts: new Date().valueOf(),
        name: 'web/page.sync',
        user,
        data: { appSettings: user?.appSettings, urls: filters.datasources.web.url }
      });
    }

    if (filters?.datasources?.web?.domain?.length)
      await inngest.send({
        v: '1',
        ts: new Date().valueOf(),
        name: 'web/urls.sync',
        user,
        data: {
          appSettings: user?.appSettings,
          byDomain: true,
          urls: filters.datasources.web.domain
        }
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
