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
  styled,
  TextField
} from '@mui/material';
import { JsonViewer } from '@textea/json-viewer';
import { RecommendedPrompt } from 'types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PromptCard from './PromptCard';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const DEFAULT_PROMPTS = [
  {
    title: 'Unassinged tickets',
    prompt:
      'What open tickets not unassigned? Provide a overview including at least title, description, priority for each ticket.'
  },
  {
    title: 'Ongoing tickets',
    prompt:
      'What tickets are assigned to Max Techera and status is: scheduled, open, in progress, discovery, new ticket? Provide a overview of the current status for each one.'
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
      'What is the details for this ticket? Provide a overview including at least title, description, priority for each ticket '
  },
  {
    title: 'Next steps',
    prompt:
      'What are the next steps? Provide information for each ticket. If the ticket is parent ticket, provide information for each child ticket.'
  },
  {
    title: 'Priority of ticket',
    prompt: 'What is the priority for each ticket?'
  }
];
type CallbackType = (data: string[]) => void;

type InitCallbackType = (cb: CallbackType) => void;

const DeveloperTools: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState<any[]>([]);
  const [isLoadingJira, setIsLoadingJira] = useState(false);
  const [isLoadingSlack, setIsLoadingSlack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState<any>({});
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const generateResponse = async (aPrompt: string) => {
    setGeneratedResponse('');
    setIsLoading(true);
    const response = await fetch('/api/ai/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: aPrompt,
        answers
      })
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    // let curr = '';
    let answer;
    let extra: any;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      if (!extra) {
        setGeneratedResponse((prev: any) => {
          let curr = (prev?.answer || '') + chunkValue;
          const [jsonData, ...rest] = curr.split('JSON_END');
          if (jsonData && rest?.length) {
            extra = JSON.parse(jsonData);
            curr = rest.join('');
          }
          answer = curr;
          return { answer: curr, ...extra };
        });
      } else {
        setGeneratedResponse((prev: any) => {
          const curr = (prev?.answer || '') + chunkValue;
          answer = curr;
          return { answer: curr, ...extra };
        });
      }
    }
    addAnswer({ answer: answer, ...extra });
    setGeneratedResponse({});
    setIsLoading(false);
  };

  const [showPrompts, setShowPrompts] = useState(false);
  const addAnswer = (answer: any) => setAnswers((currentAnswers) => [...currentAnswers, answer]);

  const { data, isFetching } = useQuery({
    enabled: !!prompt && false,
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
    generateResponse(inputValue);
  };

  const handlePromptClick = (prompt: string) => {
    if (!prompt) return;
    setPrompt(prompt);
    addAnswer({ prompt });
    setInputValue('');
    setShowPrompts(false);
    generateResponse(prompt);
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
            {generatedResponse?.context && <Answer {...generatedResponse} />}
            {(isFetching || isLoadingJira || (isLoading && !generatedResponse?.answer)) &&
            answers?.length ? (
              <Answer answer={'...'} />
            ) : null}
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

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  'border': `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  'backgroundColor':
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  'flexDirection': 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

const Answer = ({ answer, prompt, error, ...other }: any) => (
  <Card sx={{ display: 'flex', padding: 2 }}>
    <Avatar sx={{ bgcolor: answer ? deepPurple[500] : deepOrange[500] }}>
      {answer ? 'AI' : 'MT'}
    </Avatar>
    <CardContent sx={{ py: 0, px: 2, width: '100%', display: 'flex', flexDirection: 'column' }}>
      {error ? (
        <>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Ooops! Could not complete your request! Try again with a different prompt.
          </Typography>
          <JsonViewer
            rootName="response"
            value={error}
            theme={'dark'}
            collapseStringsAfterLength={100}
          />
        </>
      ) : null}
      {answer ? (
        <>
          <Typography
            sx={{
              whiteSpace: 'pre-line',
              paddingBottom: 2,
              code: { color: 'white', backgroundColor: 'black', padding: 2 }
            }}
            variant="subtitle1"
            color="text.secondary"
            component="div">
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </Typography>
          {other?.context ? (
            // Use the @mui accordion component to wrap the context and response

            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="overline">Context</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{ whiteSpace: 'pre-line' }}
                  variant="body1"
                  color="text.secondary"
                  component="div">
                  {other?.context}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : null}
          {other?.pineconeData ? (
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="overline">Pinecone</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <JsonViewer
                  rootName=""
                  value={other?.pineconeData}
                  theme={'dark'}
                  // defaultInspectDepth={0}
                  collapseStringsAfterLength={100}
                />
              </AccordionDetails>
            </Accordion>
          ) : null}
          {other?.completionData ? (
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="overline">Completion</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <JsonViewer
                  rootName=""
                  value={other?.completionData}
                  theme={'dark'}
                  // defaultInspectDepth={0}
                  collapseStringsAfterLength={100}
                />
              </AccordionDetails>
            </Accordion>
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
