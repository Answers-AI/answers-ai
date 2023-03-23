import { prisma } from 'db/dist';
import { syncAppSettings } from '../auth/syncAppSettings';

import { EventVersionHandler } from './EventVersionHandler';

// export const USER_EVENTS = ['signIn', 'signOut', 'createUser', 'updateUser', 'linkAccount'];

export const authUserSignIn: EventVersionHandler<{
  chatId: number;
  role: string;
  content: string;
}> = {
  v: '1',
  event: 'auth/user.signIn',
  handler: async ({ event }) => {
    const { data, user } = event;
    if (!user) throw new Error('NO_USER_PROVIDED');

    // if (!user?.appSettings) {
    const appSettings = await syncAppSettings(user);

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        appSettings
      }
    });
    // }
  }
};

export const authCreateUser: EventVersionHandler<{
  chatId: number;
  role: string;
  content: string;
}> = {
  v: '1',
  event: 'auth/user.createUser',
  handler: async ({ event }) => {
    const { data, user } = event;
    if (!user) throw new Error('NO_USER_PROVIDED');

    if (!user?.appSettings) {
      const appSettings = await syncAppSettings(user);

      await prisma.user.update({
        where: { id: user?.id },
        data: {
          appSettings
        }
      });
    }
  }
};
