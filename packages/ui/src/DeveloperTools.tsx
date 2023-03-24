'use client';
import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { AppSettings, Chat, Journey, User, Message } from 'types';

import { useAnswers } from './AnswersContext';
import FilterToolbar from './FilterToolbar';

import JourneySection from './JourneySection';
import { useFlags } from 'flagsmith/react';
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
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { error, chat, journey, messages, isLoading, regenerateAnswer } = useAnswers();
  React.useEffect(() => {
    if (messages?.length)
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    inputRef.current?.focus();
  }, [chat, journey, messages, error]);

  const handlePromptClick = (prompt: string) => {
    if (!prompt) return;
    if (inputRef.current) {
      inputRef.current.value = prompt;
      inputRef.current.focus();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          height: '100%',
          gridTemplateColumns: 'fit-content(320px) 1fr fit-content(320px)',
          gridTemplateRows: '1fr'
        }}>
        {journey || journeys?.length ? (
          <JourneySection journeys={journey ? [journey] : journeys} />
        ) : null}

        <ChatDetail appSettings={appSettings} user={user} prompts={prompts} />
      </Box>
    </>
  );
};

export default DeveloperTools;
