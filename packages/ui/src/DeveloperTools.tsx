'use client';
import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Container, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import { AppSettings, Chat, Journey, User, Message } from 'types';

import DeleteIcon from '@mui/icons-material/Delete';
import { MessageCard } from './Message';

import AppSyncToolbar from './AppSyncToolbar';
import { useAnswers } from './AnswersContext';
import FilterToolbar from './FilterToolbar';
import ChatCard from './ChatCard';
import JourneySection from './JourneySection';
import { useFlags } from 'flagsmith/react';
import { DefaultPrompts } from './DefaultPrompts';

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
  const flags = useFlags([
    'recommended_prompts',
    'recommended_prompts_expanded',
    'recommended_prompts_chat',
    'filters_dashboard'
  ]); // only causes re-render value==='messages' specified flag values / traits change

  const [inputValue, setInputValue] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const {
    error,
    chat,
    journey,
    filters,
    messages,
    sendMessage,
    clearMessages,
    isLoading,
    useStreaming,
    setUseStreaming,
    setShowFilters,
    regenerateAnswer
  } = useAnswers();
  React.useEffect(() => {
    if (messages?.length)
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    inputRef.current?.focus();
  }, [chat, journey, messages, error]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const isNewJourney = !!Object.keys(filters)?.length && !journey && !chat;

  const handleSubmit = () => {
    if (!inputValue) return;
    sendMessage({ content: inputValue, isNewJourney });
    setShowPrompts(false);
    setInputValue('');
  };

  const handlePromptClick = (prompt: string) => {
    if (!prompt) return;
    setInputValue(prompt);
    setShowPrompts(false);
    inputRef.current?.focus();
  };
  const handleInputFocus = () => {
    if (!Object.keys(filters)?.length) setShowFilters(true);
  };
  const handleInputBlur = () => {
    if (Object.keys(filters)?.length) setShowFilters(false);
  };
  return (
    <>
      <Box
        sx={{
          'display': 'grid',
          'flexDirection': 'column',
          'height': '100%',
          'gridTemplateColumns': '320px 1fr 320px',
          'gridTemplateRows': '1fr',

          '> *': {
            // background: 'rgba(0,0,0,0.2)',
            // border: '1px solid white'
          }
        }}>
        {journey || journeys?.length ? (
          <JourneySection journeys={journey ? [journey] : journeys} />
        ) : null}

        <Container
          sx={{
            'display': 'flex',
            'flexDirection': 'column',
            'justifyContent': 'center',
            'overflow': 'auto',
            'width': '100%',
            'height': '100%',
            'scrollbarWidth': 'thin',
            'flex': 1,
            '*': {
              '::-webkit-scrollbar ': {
                width: '2px'
              },
              '::-webkit-scrollbar-track ': {
                background: 'transparent'
              },
              '::-webkit-scrollbar-thumb ': {
                width: '1px',
                backgroundColor: 'rgba(155, 155, 155, 0.5)',
                borderRadius: '20px,',
                border: 'transparent'
              }
            }
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
            {messages.map((message, index) => (
              <MessageCard {...message} key={`message_${index}`} />
            ))}
            {error ? (
              <>
                <MessageCard
                  user={user}
                  role="assistant"
                  content={`There was an error completing your request, please try again`}
                  error={error}
                />
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={regenerateAnswer}
                    variant="contained"
                    color="primary"
                    sx={{ margin: 'auto' }}>
                    Retry
                  </Button>
                </Box>
              </>
            ) : null}
            {isLoading ? <MessageCard user={user} role="assistant" content={'...'} /> : null}
            {messages?.length && !isLoading && !error ? (
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button onClick={regenerateAnswer} variant="outlined" color="primary">
                  Regenerate answer
                </Button>
              </Box>
            ) : null}
            {flags.recommended_prompts.enabled && !messages?.length ? (
              <DefaultPrompts
                prompts={prompts}
                handlePromptClick={handlePromptClick}
                expanded={flags.recommended_prompts?.value === 'expanded'}
              />
            ) : null}
            {flags.recommended_prompts_chat.value === 'messages' &&
            messages?.length &&
            !isLoading ? (
              <DefaultPrompts
                expanded={flags.recommended_prompts?.value === 'expanded'}
                prompts={prompts}
                handlePromptClick={handlePromptClick}
              />
            ) : null}{' '}
          </Box>
        </Container>

        <Box
          sx={{
            overflow: 'auto'
          }}>
          <FilterToolbar appSettings={appSettings} />
          {flags.recommended_prompts_chat.value === 'sidebar' && messages?.length ? (
            <DefaultPrompts
              expanded={flags.recommended_prompts?.value === 'expanded'}
              prompts={prompts}
              handlePromptClick={handlePromptClick}
            />
          ) : null}
        </Box>

        <Box
          sx={{
            gridColumn: '1 / 4',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}>
          <AppSyncToolbar appSettings={appSettings} />

          <Box display="flex" position="relative">
            <TextField
              sx={{ textarea: { paddingRight: 4, paddingBottom: 5 } }}
              inputRef={inputRef}
              variant="filled"
              fullWidth
              placeholder="How can you help me accomplish my goal?"
              value={inputValue}
              // onBlur={handleInputBlur}
              multiline
              onFocus={handleInputFocus}
              onKeyPress={(e) => (e.key === 'Enter' && !e.shiftKey ? handleSubmit() : null)}
              onChange={handleInputChange}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'absolute',
                gap: 1,
                right: 16,
                bottom: 16
              }}>
              {/* Toggle component that updates when using query or streaming */}

              <FormControlLabel
                control={
                  <Switch
                    {...{ inputProps: { 'aria-label': 'Stream mode' } }}
                    checked={useStreaming}
                    onChange={() => setUseStreaming(!useStreaming)}
                    name="Stream"
                  />
                }
                label={'Stream'}
              />
              {messages?.length ? (
                <Button variant="outlined" color="primary" onClick={clearMessages}>
                  <DeleteIcon />
                </Button>
              ) : null}
              {/* <Button variant="outlined" color="primary" onClick={() => setShowPrompts(true)}>
              <AddIcon />
            </Button> */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!inputValue || isLoading}
                sx={{}}>
                {isNewJourney ? 'Start journey' : 'Send'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DeveloperTools;
