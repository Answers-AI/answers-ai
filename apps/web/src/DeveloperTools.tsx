'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  IconButton,
  Input,
  TextField,
  Typography
} from '@mui/material';
import { JsonViewer } from '@textea/json-viewer';
import { RecommendedPrompt } from 'types';
import { useQuery } from '@tanstack/react-query';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PromptCard from './PromptCard';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
const DEFAULT_PROMPTS = [
  {
    title: 'Assigned tickets',
    prompt: 'What tickets are assigned to Max Techera?'
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
    title: 'Ticket status',
    prompt: 'What is the status?'
  },
  {
    title: 'Next steps',
    prompt: 'What are the next steps?'
  },
  {
    title: 'Priority of ticket',
    prompt: 'What is the priority for each ticket?'
  }
];

const DeveloperTools: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState<any[]>([]);
  const [isLoadingJira, setIsLoadingJira] = useState(false);
  const [isLoadingSlack, setIsLoadingSlack] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [showPrompts, setShowPrompts] = useState(false);
  const addAnswer = (answer: any) => setAnswers((currentAnswers) => [...currentAnswers, answer]);

  const { data, isFetching } = useQuery({
    enabled: !!prompt,
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

  const handleSyncJira = async () => {
    setIsLoadingJira(true);

    addAnswer({ prompt: 'Can you please sync all jira tickets?' });
    try {
      await axios.post(`/api/sync/jira`);
      addAnswer({ answer: 'Synced Jira successfully' });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingJira(false);
    }
  };
  const handleSyncSlack = async () => {
    setIsLoadingSlack(true);

    addAnswer({ prompt: 'Can you please sync all Slack tickets?' });
    try {
      await axios.post(`/api/sync/slack`);
      addAnswer({ answer: 'Synced Slack successfully' });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSlack(false);
    }
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    setPrompt(inputValue);
    setAnswers([...answers, { prompt: inputValue }]);
    setShowPrompts(false);
    setInputValue('');
  };

  const handlePromptClick = (prompt: string) => {
    if (!prompt) return;
    setPrompt(prompt);
    addAnswer({ prompt });
    setInputValue('');
    setShowPrompts(false);
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
            {(isFetching || isLoadingJira) && answers?.length ? <Answer answer={'...'} /> : null}
            {!answers?.length || showPrompts ? (
              <DefaultPrompts prompts={DEFAULT_PROMPTS} handlePromptClick={handlePromptClick} />
            ) : null}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
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
          </Button>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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

const Answer = ({ answer, prompt, error, ...other }: any) => (
  <Card sx={{ display: 'flex', padding: 2 }}>
    <Avatar sx={{ bgcolor: answer ? deepPurple[500] : deepOrange[500] }}>
      {answer ? 'AI' : 'MT'}
    </Avatar>
    <CardContent
      sx={{ py: 0, px: 2, width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
      {error ? (
        <>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Ooops! Could not complete your request! Try again with a different prompt.
          </Typography>
          <JsonViewer
            rootName="response"
            value={error}
            theme={'dark'}
            defaultInspectDepth={0}
            collapseStringsAfterLength={100}
          />
        </>
      ) : null}
      {answer ? (
        <>
          <Typography
            sx={{ whiteSpace: 'pre-line' }}
            variant="subtitle1"
            color="text.secondary"
            component="div">
            {answer}
          </Typography>

          {other?.context ? (
            <JsonViewer
              rootName="response"
              value={other}
              theme={'dark'}
              defaultInspectDepth={0}
              collapseStringsAfterLength={100}
            />
          ) : null}
        </>
      ) : null}
      {prompt && !error && !answer ? (
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {prompt}
        </Typography>
      ) : null}
    </CardContent>
  </Card>
);
export default DeveloperTools;
