'use client';
import React, { Suspense } from 'react';
import Button from '@mui/material/Button';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { AppSettings } from 'types';
import { MessageCard } from './Message';
import { useAnswers } from './AnswersContext';
import SourcesToolbar from './JourneyLayout/SourcesToolbar';
import { ChatInput } from './ChatInput';

export const ChatDetail = ({
  appSettings,
  prompts
}: {
  appSettings: AppSettings;
  prompts?: any;
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const {
    error,
    chat,
    journey,
    messages: clientMessages,
    isLoading,
    regenerateAnswer
  } = useAnswers();
  const messages = clientMessages || chat?.messages;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'space-between',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
        <AppBar
          position="static"
          sx={{ paddingLeft: 4, borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}
          color={'transparent'}
          elevation={0}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              {chat ? <Typography variant="body1">{chat?.title ?? chat.id}</Typography> : null}
              {journey ? (
                <Typography variant="body2">{journey?.goal ?? journey?.title}</Typography>
              ) : null}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <SourcesToolbar appSettings={appSettings} />
              {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            </Box>
          </Toolbar>
        </AppBar>
        <Box ref={scrollRef} sx={{ height: '100%', overflow: 'auto', px: 2, py: 3 }}>
          <Suspense fallback={<div>Loading...</div>}>
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
                    // user={user}
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
              {isLoading ? (
                <MessageCard
                  //  user={user}
                  role="loading"
                  content={'...'}
                />
              ) : null}
              {!messages?.length ? (
                <MessageCard
                  // user={user}
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
          </Suspense>
        </Box>
      </Box>
      <ChatInput />
    </>
  );
};
