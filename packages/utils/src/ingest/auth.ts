import { prisma } from 'db/dist';
import { syncAppSettings } from '../auth/syncAppSettings';

import { EventVersionHandler } from './EventVersionHandler';

export const answersMessageSent: EventVersionHandler<{
  chatId: number;
  role: string;
  content: string;
}> = {
  v: '1',
  event: 'auth/user.signIn',
  handler: async ({ event }) => {
    const { data, user } = event;
    if (!user) throw new Error('NO_USER_PROVIDED');

    const appSettings = await syncAppSettings(user);

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        appSettings
      }
    });
  }
};
