'use client';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Box, FormControlLabel, Switch, TextField } from '@mui/material';
import { AppSettings, RecommendedPrompt } from 'types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PromptCard from './PromptCard';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Answer } from './Answer';
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

const DeveloperTools = ({ appSettings }: { appSettings: AppSettings }) => {
  const [inputValue, setInputValue] = useState('');
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState<any[]>([]);
  const addAnswer = useCallback(
    (answer: any) => setAnswers((currentAnswers) => [...currentAnswers, answer]),
    []
  );
  const { isLoading, generatedResponse, generateResponse } = useStreamedResponse({
    answers,
    addAnswer
  });
  const [useStreaming, setUseStreaming] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

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
        .post(`/api/ai/query`, { prompt, answers })
        .then((res) => res.data)
        .catch((error) => ({
          error: error?.response?.data?.error
        })),
    onSuccess: (data) => {
      if (answers?.length) addAnswer(data);
    }
  });
  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [answers]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSync = async (name: string) => {
    addAnswer({ prompt: `Can you please sync all ${name} tickets?` });
    try {
      await axios.post(`/api/sync/${name}`);
      addAnswer({
        answer: `Synced ${name} event sent. Go to <a href="/events">events</a> to track the status.`
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    setPrompt(inputValue);
    setAnswers([...answers, { prompt: inputValue }]);
    setShowPrompts(false);
    setInputValue('');
    if (useStreaming) generateResponse(inputValue);
  };

  const handlePromptClick = (prompt: string) => {
    if (!prompt) return;
    setPrompt(prompt);
    addAnswer({ prompt });
    setInputValue('');
    setShowPrompts(false);

    if (useStreaming) generateResponse(prompt);
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
            {answers.map((answer, index) => (
              <Answer {...answer} key={index} />
            ))}
            {generatedResponse?.answer && <Answer {...generatedResponse} />}
            {(isFetching || (isLoading && !generatedResponse?.answer)) && answers?.length ? (
              <Answer answer={'...'} />
            ) : null}
            {!answers?.length || showPrompts ? (
              <DefaultPrompts prompts={DEFAULT_PROMPTS} handlePromptClick={handlePromptClick} />
            ) : null}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <AppSyncToolbar
            appSettings={appSettings}
            onSync={(service) =>
              addAnswer({
                answer: `Synced ${service.name} event sent. Go to <a href="/events">events</a> to track the status.`
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
            {answers?.length ? (
              <Button variant="outlined" color="primary" onClick={() => setAnswers([])}>
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
  <Grid2 container spacing={2} sx={{ width: '100%' }}>
    {prompts?.map((prompt) => (
      <Grid2 xs={6} key={prompt?.prompt}>
        <PromptCard {...prompt} onClick={() => handlePromptClick(prompt?.prompt)} />
      </Grid2>
    ))}
  </Grid2>
);

export default DeveloperTools;
