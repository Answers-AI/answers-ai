'use client';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Box, FormControlLabel, Switch, TextField } from '@mui/material';
import { AppSettings, RecommendedPrompt } from 'types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PromptCard from './PromptCard';
import AddIcon from '@mui/icons-material/PlusOne';
import DeleteIcon from '@mui/icons-material/Delete';
import { Message } from './Message';
import { useStreamedResponse } from './useStreamedResponse';
import AppSyncToolbar from 'AppSyncToolbar';

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
type CallbackType = (data: string[]) => void;

type InitCallbackType = (cb: CallbackType) => void;

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
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const addMessage = useCallback(
    (message: any) => setMessages((currentMessages) => [...currentMessages, message]),
    []
  );
  const { isLoading, generatedResponse, generateResponse } = useStreamedResponse({
    messages,
    addMessage
  });
  const [useStreaming, setUseStreaming] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { data, isFetching } = useQuery({
    enabled: !!prompt && !useStreaming,
    queryKey: ['completion', prompt],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    cacheTime: 0,
    retry: false,
    queryFn: () =>
      axios
        .post(`/api/ai/query`, { prompt, messages })
        .then((res) => res.data)
        .catch((error) => ({
          error: error?.response?.data?.error
        })),
    onSuccess: (data) => {
      if (messages?.length) addMessage(data);
    }
  });
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSync = async (name: string) => {
    addMessage({ role: 'user', content: `Can you please sync all ${name} tickets?` });
    try {
      await axios.post(`/api/sync/${name}`);
      addMessage({
        role: 'system',
        message: `Synced ${name} event sent. Go to <a href="/events">events</a> to track the status.`
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    setPrompt(inputValue);
    setMessages([...messages, { role: 'user', content: inputValue }]);
    setShowPrompts(false);
    setInputValue('');
    if (useStreaming) generateResponse(inputValue);
  };

  const handlePromptClick = (prompt: string) => {
    if (!prompt) return;

    // addMessage({ role: 'user', content: prompt });
    setInputValue(prompt);
    setShowPrompts(false);
    inputRef.current?.focus();

    // if (useStreaming) generateResponse(prompt);
  };
  console.log('MEssages', messages);
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
              <Message {...message} key={index} />
            ))}
            {generatedResponse?.message && <Message {...generatedResponse} />}
            {(isFetching || (isLoading && !generatedResponse?.message)) && messages?.length ? (
              <Message user={user} message={'...'} />
            ) : null}
            {!messages?.length || showPrompts ? (
              <DefaultPrompts prompts={[...prompts]} handlePromptClick={handlePromptClick} />
            ) : null}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <AppSyncToolbar
            appSettings={appSettings}
            onSync={(service) =>
              addMessage({
                role: 'assistant',
                content: `Synced ${service.name} event sent. Go to <a href="/events">events</a> to track the status.`
              })
            }
          />

          {/* <Button
            sx={{
              position: 'relative',
              label: { transition: '2.s', opacity: isLoadingJira ? 0 : 1 }
            }}
            variant="outlined"
            color="primary"
            disabled={isLoadingJira}
            onClick={handleSyncJira}>
            {isLoadingJira ? <CircularProgress size={24} sx={{ position: 'absolute' }} /> : null}
            <label>Sync Jira</label>
          </Button>

          <Button
            sx={{
              position: 'relative',
              label: { transition: '2.s', opacity: isLoadingSlack ? 0 : 1 }
            }}
            variant="outlined"
            color="primary"
            disabled={isLoadingSlack}
            onClick={handleSyncSlack}>
            {isLoadingSlack ? <CircularProgress size={24} sx={{ position: 'absolute' }} /> : null}
            <label>Sync Slack</label>
          </Button> */}

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <>
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
            </>
            {messages?.length ? (
              <Button variant="outlined" color="primary" onClick={() => setMessages([])}>
                <DeleteIcon />
              </Button>
            ) : null}
            <Button variant="outlined" color="primary" onClick={() => setShowPrompts(true)}>
              <AddIcon />
            </Button>
          </Box>
        </Box>

        <Box sx={{ position: 'relative' }}>
          <TextField
            inputRef={inputRef}
            variant="filled"
            fullWidth
            placeholder="What is the status of the ticket?"
            value={inputValue}
            onKeyPress={(e) => (e.key === 'Enter' ? handleSubmit() : null)}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!inputValue || isFetching}
            sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>
            Send
          </Button>
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
      <PromptCard key={prompt.id} {...prompt} onClick={() => handlePromptClick(prompt?.prompt)} />
    ))}
  </Box>
);

export default DeveloperTools;
