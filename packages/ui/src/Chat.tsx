import React from 'react';
import { getAppSettings } from '@ui/getAppSettings';
import { prisma } from '@db/client';

import { ChatDetail } from './ChatDetail';
import { Chat, Journey } from 'types';
import { AnswersProvider } from './AnswersContext';
import Modal from '@ui/Modal';

export interface Params {
  chat?: Chat;
  journey?: Journey;
}

const Chat = async ({ chat, journey }: Params) => {
  const appSettingsPromise = getAppSettings();

  // const promptsPromise = prisma.prompt
  //   .findMany({
  //     where: {
  //       usages: { gt: 1 }
  //     },
  //     orderBy: [
  //       {
  //         likes: 'desc'
  //       },
  //       {
  //         usages: 'desc'
  //       }
  //     ]
  //   })
  //   .then((data: any) => JSON.parse(JSON.stringify(data)));

  const [
    appSettings
    //  prompts
  ] = await Promise.all([
    appSettingsPromise
    // promptsPromise
  ]);

  return (
    <AnswersProvider appSettings={appSettings} chat={chat} journey={journey}>
      <Modal />
      <ChatDetail appSettings={appSettings} />
    </AnswersProvider>
  );
};

export default Chat;
