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
  const flags = useFlags([
    'recommended_prompts',
    'recommended_prompts_expanded',
    'recommended_prompts_chat',
    'filters_dashboard'
  ]); // only causes re-render value==='messages' specified flag values / traits change

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
    <Box
      sx={{
        'display': 'flex',
        'flexDirection': 'column',
        'overflow': 'hidden',
        'width': '100%',
        'height': '100%',
        'flex': 1,
        'justifyContent': 'space-between',
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
      <AppBar position="static" sx={{ paddingLeft: 4 }}>
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
      <Box
        sx={{ display: 'flex', flexDirection: 'column', overflow: 'auto', flex: 1, gap: 2, p: 2 }}>
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
          <Box sx={{ py: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button onClick={regenerateAnswer} variant="outlined" color="primary">
              Regenerate answer
            </Button>
          </Box>
        ) : null}
      </Box>

      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}>
        <AppSyncToolbar appSettings={appSettings} />
        <ChatInput inputRef={inputRef} />
      </Box>
    </Box>
  );
};
