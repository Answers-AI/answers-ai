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

import { useQuery } from '@tanstack/react-query';
import { deepOrange, deepPurple } from '@mui/material/colors';

const DeveloperTools: React.FC = () => {
  const [inputValue, setInputValue] = useState('What is the current status of tickets assigned to Max Techera?');
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState<any[]>([]);
  const [isLoadingJira, setIsLoadingJira] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

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
        .post(`/api/ai/query`, { prompt })
        .then((res) => res.data)
        .catch((error) => ({
          error: error?.response?.data?.error
        })),
    onSuccess: (data) => {
      addAnswer(data);
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

  const handleSubmit = () => {
    if (!inputValue) return;
    setPrompt(inputValue);
    setAnswers([...answers, { prompt: inputValue }]);
    setInputValue('');
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, padding: 2, flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flex: 1, overflow: 'auto' }} ref={scrollRef}>
          <Box sx={{ gap: 2, flexDirection: 'column', display: 'flex' }}>
            {answers.map((answer, index) => (
              <Answer {...answer} key={index} />
            ))}
            {isFetching || isLoadingJira ? <Answer answer={'...'} /> : null}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            sx={{ position: 'relative', label: { transition: '2.s', opacity: isLoadingJira ? 0 : 1 } }}
            variant="outlined"
            color="primary"
            disabled={isLoadingJira}
            onClick={handleSyncJira}>
            {isLoadingJira ? <CircularProgress size={24} sx={{ position: 'absolute' }} /> : null}
            <label>Sync Jira</label>
          </Button>

          <Button variant="outlined" color="primary" disabled>
            Sync Slack
          </Button>
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

const Answer = ({ answer, prompt, error, ...other }: any) => (
  <Card sx={{ display: 'flex', padding: 2 }}>
    <Avatar sx={{ bgcolor: answer ? deepPurple[500] : deepOrange[500] }}>{answer ? 'AI' : 'MT'}</Avatar>
    <CardContent sx={{ py: 0, px: 2, width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
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
          <Typography variant="subtitle1" color="text.secondary" component="div">
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
