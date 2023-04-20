import { prisma } from 'db/dist';

import { AnswersFilters, User, Chat } from 'types';
// import { inngest } from './client';
import { EventVersionHandler } from './EventVersionHandler';
import { openai } from '../openai/client';
import { upsertChat } from '../upsertChat';

export const answersMessageSent: EventVersionHandler<{
  chatId: string;
  filters: AnswersFilters;
  user: User;
  role: string;
  content: string;
}> = {
  v: '1',
  event: 'answers/message.sent',
  handler: async ({ event }) => {
    const { data, user } = event;
    const { role, content, chatId } = data;
    // if (filters?.datasources?.web?.url?.length) {
    //   console.log('web/page.sync', filters.datasources.web.url);
    //   await inngest.send({
    //     v: '1',
    //     ts: new Date().valueOf(),
    //     name: 'web/page.sync',
    //     user,
    //     data: { appSettings: user?.appSettings, urls: filters.datasources.web.url }
    //   });
    // }

    // if (filters?.datasources?.web?.domain?.length)
    //   await inngest.send({
    //     v: '1',
    //     ts: new Date().valueOf(),
    //     name: 'web/urls.sync',
    //     user,
    //     data: {
    //       appSettings: user?.appSettings,
    //       byDomain: true,
    //       urls: filters.datasources.web.domain
    //     }
    //   });

    const messages = await prisma.message.findMany({
      where: { chatId: chatId },
      orderBy: { createdAt: 'asc' }
    });
    const history = messages?.map(({ role, content }) => `${role}: ${content}`).join('\n');

    const titlePrompt = `Use the following conversation between a human and an AI assistant. Create a short title that represents the human intention. HISTORY: ${history} TITLE:`;
    const res = await openai.createCompletion({
      max_tokens: 500,
      prompt: titlePrompt,
      temperature: 0.1,
      model: 'text-davinci-003'
    });
    const title = res?.data?.choices?.[0]?.text!;
    console.log('AITitle', title);
    await prisma.chat.update({
      where: { id: chatId },
      data: {
        title
      }
    });

    return prisma.message.create({
      data: {
        ...(role == 'user' && user?.email ? { user: { connect: { email: user?.email } } } : {}),
        chat: { connect: { id: chatId } },
        role,
        content: content
      }
    });
  }
};
