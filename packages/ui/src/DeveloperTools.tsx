'use client';
import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { AppSettings, Chat, Journey, User } from 'types';

import JourneySection from './JourneySection';

import { ChatDetail } from './ChatDetail';

const DeveloperTools = ({
  appSettings,
  user,
  prompts,
  journeys,
  chats
}: {
  appSettings: AppSettings;
  journeys?: Journey[];
  chats?: Chat[];
  user: User;
  prompts?: any;
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          height: '100%',
          gridTemplateColumns: 'fit-content(320px) 1fr fit-content(320px)',
          gridTemplateRows: '1fr'
        }}>
        <JourneySection journeys={journeys} chats={chats} />
        <ChatDetail appSettings={appSettings} user={user} prompts={prompts} />
      </Box>
    </>
  );
};

export default DeveloperTools;
