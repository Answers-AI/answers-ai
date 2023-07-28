import React, { Suspense } from 'react';

import { getAppSettings } from './getAppSettings';
import { ChatDetail } from './ChatDetail';
import { AnswersProvider } from './AnswersContext';
import Modal from './Modal';
import getCachedSession from './getCachedSession';

import type { Sidekick, Chat, Journey } from 'types';

export interface Params {
  chat?: Chat;
  journey?: Journey;
  sidekicks?: Sidekick[];
}

const Chat = async ({ chat, journey, sidekicks }: Params) => {
  const appSettingsPromise = getAppSettings();
  const sessionPromise = getCachedSession();

  const [session, appSettings] = await Promise.all([sessionPromise, appSettingsPromise]);

  return (
    <AnswersProvider user={session?.user!} appSettings={appSettings} chat={chat} journey={journey}>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal />
      </Suspense>
      <ChatDetail appSettings={appSettings} sidekicks={sidekicks} />
    </AnswersProvider>
  );
};

export default Chat;
