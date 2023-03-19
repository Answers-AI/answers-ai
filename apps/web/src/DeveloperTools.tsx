'use client';
import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Container, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import { AppSettings, RecommendedPrompt, Chat, Journey, User } from 'types';
import PromptCard from './PromptCard';

import DeleteIcon from '@mui/icons-material/Delete';
import { MessageCard } from './Message';

import AppSyncToolbar from './AppSyncToolbar';
import { useAnswers } from './AnswersContext';
import FilterToolbar from './FilterToolbar';
import ChatCard from './ChatCard';
import JourneySection from './JourneySection';

const DEFAULT_PROMPTS = [
  {
    title: 'Unassinged tickets',
    prompt:
      'What open tickets not unassigned? Provide a overview including at least title, description, priority for each ticket.'
  },
  {
    title: 'Ongoing tickets',
    prompt:
      'What tickets have the highest priority and are assigned to Max Techera and status is: scheduled, open, in progress, discovery, new ticket? Provide a overview of the current status for each one. Do not include items that are resolved.'
  },
  {
    title: 'Customer action items',
    prompt:
      'What tickets are waiting for customer action? Provide a overview of the current status for each one.'
  },

  {
    title: 'Drata tickets',
    prompt:
      'What are the Drata tickets? Include ticket number, status, assignee, description and next steps.'
  },
  {
    prompt:
      'Have there been any roadblocks or issues that are preventing the ticket from being completed?'
  },
  {
    prompt:
      'Has the ticket been tested and validated, and are there any issues or defects that need to be addressed?'
  },
  {
    prompt:
      'When answering with code examples wrap it between code tags like <code>{examples}</code> and explain it below.'
  },

  {
    title: 'Ticket status',
    prompt: 'What is the status?'
  },
  {
    title: 'Ticket details',
    prompt:
      'What is the details for this ticket? Provide a overview including at least title, description, priority and a summar of the thread comments for each ticket. List all items that have this ticket as parent key.'
  },
  { title: 'Ticket comments', prompt: 'What are the comments for DRATA-286? ' },
  {
    title: 'Next steps',
    prompt:
      'What is the summary of the description? Provide information for each ticket. If the ticket is parent ticket, provide information for each child ticket.'
  },
  {
    title: 'Priority of ticket',
    prompt: 'What is the priority for each ticket?'
  }
];

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
  }, [chat, journey, filters, messages, error]);
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
          display: 'flex',
          flexDirection: 'column',
          height: '100%',

          py: 2
        }}>
        <Container
          sx={{
            'display': 'flex',
            'flexDirection': 'column',
            'overflow': 'hidden',
            'height': '100%',

            'scrollbarWidth': 'thin',
            'flex': 1,
            '*': {
              '::-webkit-scrollbar ': {
                width: '9px'
              },
              '::-webkit-scrollbar-track ': {
                background: 'transparent'
              },
              '::-webkit-scrollbar-thumb ': {
                'background-color': 'rgba(155, 155, 155, 0.5)',
                'border-radius': '20px,',
                'border': 'transparent'
              }
            }
          }}>
          <Box
            ref={scrollRef}
            sx={{
              width: '100%',
              gap: 2,
              flexDirection: 'column',
              display: 'flex',
              height: '100%'
            }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 320px',
                gap: 4,
                height: '100%',
                overflow: 'hidden'
              }}>
              <Box
                sx={{
                  overflow: 'hidden',
                  overflowY: 'auto'
                }}>
                {!messages?.length ? (
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      flexDirection: 'column',
                      gap: 4,
                      height: '100%',
                      overflow: 'hidden'
                    }}>
                    {journey || journeys?.length ? (
                      <JourneySection journeys={journey ? [journey] : journeys} />
                    ) : null}
                    {!journey && chats?.length && !Object.keys(filters)?.length ? (
                      <Box>
                        <Typography variant="overline">Chats</Typography>
                        <Box
                          sx={{
                            width: '100%',
                            display: 'grid',
                            gap: 2,
                            gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))'
                          }}>
                          {chats?.map((chat) => (
                            <ChatCard key={chat.id} {...chat} />
                          ))}
                        </Box>
                      </Box>
                    ) : null}
                  </Box>
                ) : null}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                </Box>
              </Box>
              <DefaultPrompts prompts={prompts} handlePromptClick={handlePromptClick} />
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            gap: 2,
            width: '100%'
          }}>
          <FilterToolbar appSettings={appSettings} />
          <AppSyncToolbar appSettings={appSettings} />

          <Box display="flex" position="relative">
            <TextField
              inputRef={inputRef}
              variant="filled"
              fullWidth
              placeholder="What is the status of the ticket?"
              value={inputValue}
              // onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onKeyPress={(e) => (e.key === 'Enter' ? handleSubmit() : null)}
              onChange={handleInputChange}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'absolute',
                gap: 1,
                right: 8,
                bottom: 10
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
interface DefaultPromptsProps {
  prompts: RecommendedPrompt[];
  handlePromptClick: (prompt: string) => void;
}

const DefaultPrompts = ({ prompts, handlePromptClick }: DefaultPromptsProps) =>
  prompts?.length ? (
    <Box sx={{ overflow: 'hidden', overflowY: 'auto', height: '100%' }}>
      <Typography variant="overline">Recommended prompts</Typography>
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
        }}>
        {prompts?.map((prompt) => (
          <PromptCard
            key={prompt.id}
            {...prompt}
            onClick={() => handlePromptClick(prompt?.content)}
          />
        ))}
      </Box>
    </Box>
  ) : null;

export default DeveloperTools;
