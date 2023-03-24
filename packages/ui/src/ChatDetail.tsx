'use client';
import React from 'react';
import Button from '@mui/material/Button';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { AppSettings, User } from 'types';
import { MessageCard } from './Message';
import AppSyncToolbar from './AppSyncToolbar';
import { useAnswers } from './AnswersContext';
import { useFlags } from 'flagsmith/react';
import { DefaultPrompts } from './DefaultPrompts';
import { ChatInput } from './ChatInput';
import MenuIcon from '@mui/icons-material/Menu';
import SourcesToolbar from './SourcesToolbar';

export const ChatDetail = ({
  appSettings,
  user,
  prompts
}: {
  appSettings: AppSettings;
  user: User;
  prompts?: any;
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { setInputValue, error, chat, journey, messages, isLoading, regenerateAnswer } =
    useAnswers();
  React.useEffect(() => {
    if (messages?.length)
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    inputRef.current?.focus();
  }, [chat, journey, messages, error]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between'
      }}>
      <AppBar
        position="static"
        sx={{ paddingLeft: 4, borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}
        color={'transparent'}
        elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {journey ? journey?.title : null}
            {chat ? chat?.id : null}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <SourcesToolbar appSettings={appSettings} />
            {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
          </Box>
        </Toolbar>
      </AppBar>
      <Box ref={scrollRef} sx={{ height: '100%', overflow: 'auto', px: 2, py: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',

            gap: 2
          }}>
          {messages?.map((message, index) => (
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
          {!messages?.length ? (
            <MessageCard
              user={user}
              role="assistant"
              content={
                'Welcome! Try asking me something below, or select your data sources on the top right!'
              }
            />
          ) : null}
          {messages?.length && !isLoading && !error ? (
            <Box sx={{ py: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button onClick={regenerateAnswer} variant="outlined" color="primary">
                Regenerate answer
              </Button>
            </Box>
          ) : null}
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          px: 2,
          paddingBottom: 3
        }}>
        <AppSyncToolbar appSettings={appSettings} />
        <ChatInput inputRef={inputRef} />
      </Box>
    </Box>
  );
};
