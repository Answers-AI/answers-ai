import React, { Suspense } from 'react';

import { getAppSettings } from './getAppSettings';
import { ChatDetail } from './ChatDetail';
import { AnswersProvider } from './AnswersContext';
import Modal from './Modal';
import getCachedSession from './getCachedSession';

import { Chat, Journey } from 'types';

export interface Params {
  chat?: Chat;
  journey?: Journey;
}

const Chat = async ({ chat, journey }: Params) => {
  const appSettingsPromise = getAppSettings();
  const session = await getCachedSession();

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
    <AnswersProvider user={session?.user!} appSettings={appSettings} chat={chat} journey={journey}>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal />
      </Suspense>
      <ChatDetail appSettings={appSettings} />
    </AnswersProvider>
  );
};

export default Chat;
