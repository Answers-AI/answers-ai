'use client';
import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  FormControlLabel,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { AppSettings, Chat, Journey, User, Message, Prompt } from 'types';
import PromptCard from './PromptCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrashCan, faCaretSquareDown } from '@fortawesome/free-regular-svg-icons';

import { MessageCard } from './Message';

import AppSyncToolbar from './AppSyncToolbar';
import { useAnswers } from './AnswersContext';
import FilterToolbar from './FilterToolbar';
import ChatCard from './ChatCard';
import JourneySection from './JourneySection';
import { useFlags } from 'flagsmith/react';

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
  const flags = useFlags([
    'recommended_prompts',
    'recommended_prompts_expanded',
    'recommended_prompts_chat',
    'filters_dashboard'
  ]); // only causes re-render value==='messages' specified flag values / traits change

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
  }, [chat, journey, messages, error]);
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
          <Box
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
                gridTemplateColumns: { md: '1fr 320px', sm: '1fr' },
                gap: { md: 4, sm: 1 },
                height: '100%',
                overflow: 'hidden'
              }}>
              <Box
                ref={scrollRef}
                sx={{
                  overflow: 'hidden',
                  overflowY: 'auto'
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}>
                  {!messages?.length ? (
                    <Box
                      sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        gap: 4
                      }}>
                      {/* TODO: Filter journeys by selected filter */}
                      {journey || (journeys?.length && !Object.keys(filters)?.length) ? (
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
                              gridTemplateColumns: { md: 'repeat(3, minmax(0px, 1fr))', sm: '1fr' }
                            }}>
                            {chats?.map((chat) => (
                              <ChatCard key={chat.id} {...chat} />
                            ))}
                          </Box>
                        </Box>
                      ) : null}
                    </Box>
                  ) : null}

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

                  {flags.recommended_prompts.enabled && !messages?.length ? (
                    <DefaultPrompts
                      prompts={prompts}
                      handlePromptClick={handlePromptClick}
                      expanded={flags.recommended_prompts?.value === 'expanded'}
                    />
                  ) : null}

                  {flags.recommended_prompts_chat.value === 'messages' &&
                  messages?.length &&
                  !isLoading ? (
                    <DefaultPrompts
                      expanded={flags.recommended_prompts?.value === 'expanded'}
                      prompts={prompts}
                      handlePromptClick={handlePromptClick}
                    />
                  ) : null}
                </Box>
              </Box>
              <Box
                sx={{
                  overflow: 'auto'
                }}>
                <FilterToolbar appSettings={appSettings} />
                {flags.recommended_prompts_chat.value === 'sidebar' && messages?.length ? (
                  <DefaultPrompts
                    expanded={flags.recommended_prompts?.value === 'expanded'}
                    prompts={prompts}
                    handlePromptClick={handlePromptClick}
                  />
                ) : null}
              </Box>
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            px: [2, 3],
            gap: 0,
            width: '100%'
          }}>
          <AppSyncToolbar appSettings={appSettings} />

          <Box display="flex" position="relative">
            <TextField
              sx={{ textarea: { paddingRight: 4, paddingBottom: 5 } }}
              inputRef={inputRef}
              variant="filled"
              fullWidth
              placeholder="How can you help me accomplish my goal?"
              value={inputValue}
              // onBlur={handleInputBlur}
              multiline
              onFocus={handleInputFocus}
              onKeyPress={(e) => (e.key === 'Enter' && !e.shiftKey ? handleSubmit() : null)}
              onChange={handleInputChange}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'absolute',
                gap: 1,
                right: 16,
                bottom: 16
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
                  <FontAwesomeIcon icon={faTrashCan} />
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
  prompts: Prompt[];
  handlePromptClick: (prompt: string) => void;
  expanded: boolean;
}

const DefaultPrompts = ({ prompts, handlePromptClick, expanded }: DefaultPromptsProps) =>
  prompts?.length ? (
    <Accordion
      defaultExpanded={expanded}
      sx={{
        '&, .MuiAccordion-root ': {
          'width': '100%',
          'overflow': 'hidden',
          'm': 0,
          'background': 'none',
          'boxShadow': 'none',
          '&.Mui-expanded': {
            margin: 0
          },
          '.MuiAccordionSummary-root': {
            'px': 0,
            'minHeight': 0,
            '&.Mui-expanded': { minHeight: 0 },
            'justifyContent': 'flex-start',
            'gap': 2
          },
          '.MuiAccordionSummary-content': {
            'm': 0,
            'flexGrow': 'initial',
            '&.Mui-expanded': { m: 0 }
          },
          '.MuiAccordionDetails-root': { p: 0 }
        }
      }}>
      <AccordionSummary
        expandIcon={<FontAwesomeIcon icon={faCaretSquareDown} />}
        aria-controls="filters-content"
        id="filters-header">
        <Typography variant="overline">Recommended prompts</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{}}>
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { md: 'repeat(3, minmax(0px, 1fr))', sm: '1fr' }
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
      </AccordionDetails>
    </Accordion>
  ) : null;

export default DeveloperTools;
