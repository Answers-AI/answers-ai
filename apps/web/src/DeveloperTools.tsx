'use client';
import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, FormControlLabel, Switch, TextField } from '@mui/material';
import { AppSettings, RecommendedPrompt } from 'types';
import PromptCard from './PromptCard';

import DeleteIcon from '@mui/icons-material/Delete';
import { MessageCard } from './Message';

import AppSyncToolbar from './AppSyncToolbar';
import { useAnswers } from './AnswersContext';
import FilterToolbar from './FilterToolbar';

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
  prompts
}: {
  appSettings: AppSettings;
  user: any;
  prompts: any;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { messages, sendMessage, clearMessages, isLoading, useStreaming, setUseStreaming } =
    useAnswers();
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    sendMessage(inputValue);
    setShowPrompts(false);
    setInputValue('');
  };

  const handlePromptClick = (prompt: string) => {
    if (!prompt) return;
    setInputValue(prompt);
    setShowPrompts(false);
    inputRef.current?.focus();
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: 2,
          padding: 2,
          flexDirection: 'column',
          height: '100%'
        }}>
        <Box sx={{ width: '100%', flex: 1, overflowX: 'auto' }} ref={scrollRef}>
          <Box sx={{ width: '100%', gap: 2, flexDirection: 'column', display: 'flex' }}>
            {messages.map((message, index) => (
              <MessageCard {...message} key={index} />
            ))}
            {isLoading ? <MessageCard user={user} role="assistant" content={'...'} /> : null}
            {!messages?.length || showPrompts ? (
              <DefaultPrompts prompts={[...prompts]} handlePromptClick={handlePromptClick} />
            ) : null}
          </Box>
        </Box>

        <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FilterToolbar appSettings={appSettings} />
          <AppSyncToolbar appSettings={appSettings} />

          <TextField
            inputRef={inputRef}
            variant="filled"
            fullWidth
            placeholder="What is the status of the ticket?"
            value={inputValue}
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
              Send
            </Button>
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

const DefaultPrompts = ({ prompts, handlePromptClick }: DefaultPromptsProps) => (
  <Box
    sx={{
      width: '100%',
      display: 'grid',
      gap: 2,
      gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))'
    }}>
    {prompts?.map((prompt) => (
      <PromptCard key={prompt.id} {...prompt} onClick={() => handlePromptClick(prompt?.content)} />
    ))}
  </Box>
);

export default DeveloperTools;
