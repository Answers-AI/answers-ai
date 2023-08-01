'use client';
import React, { useState, useEffect, useRef, ChangeEvent, useCallback } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

import { useAnswers } from './AnswersContext';
import SidekickSelect from './SidekickSelect';
import Fieldset from './Fieldset';

import { debounce } from '@utils/debounce';

import type { Sidekick } from 'types';

const ChatInput = ({
  scrollRef,
  isWidget,
  sidekicks = []
}: {
  scrollRef?: any;
  isWidget?: boolean;
  sidekicks?: Sidekick[];
}) => {
  const defaultPlaceholderValue = 'How can you help me accomplish my goal?';
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState(defaultPlaceholderValue);

  const {
    chat,
    journey,
    messages,
    sendMessage,
    isLoading,
    sidekick,
    setSidekick,
    gptModel,
    setGptModel,
    startNewChat
  } = useAnswers();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const debouncedScroll = debounce(() => {
      if (messages?.length)
        scrollRef?.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      inputRef?.current?.focus();
    }, 300);
    debouncedScroll();
  }, [chat, journey, messages, scrollRef]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    sendMessage({ content: inputValue, sidekick, gptModel });
    setInputValue('');
  };

  const handleSidekickSelected = useCallback((value: Sidekick) => {
    setPlaceholder(value?.placeholder ?? defaultPlaceholderValue);
    setSidekick(value);
    if (value.aiModel) {
      setGptModel(value.aiModel);
    }
  }, []);

  const handleGptModelSelected = (event: SelectChangeEvent<string>) => {
    setGptModel(event.target.value as string);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit();
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  return (
    <Box display="flex" position="relative" sx={{ gap: 1, flexDirection: 'column', pb: 2, px: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <SidekickSelect onSidekickSelected={handleSidekickSelected} sidekicks={sidekicks} />
        <Fieldset legend="Model">
          <Select
            labelId="model-select-label"
            id="model-select"
            size="small"
            sx={{ 'boxShadow': 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
            value={gptModel}
            onChange={handleGptModelSelected}>
            <MenuItem key="gpt3" value="gpt-3.5-turbo">
              GPT 3.5
            </MenuItem>
            <MenuItem key="gpt316k" value="gpt-3.5-turbo-16k">
              GPT 3.5 16k
            </MenuItem>
            <MenuItem key="gpt4" value="gpt-4">
              GPT 4
            </MenuItem>
          </Select>
        </Fieldset>
      </Box>

      <TextField
        id="user-chat-input"
        inputRef={inputRef}
        sx={(theme) => ({
          textarea: {
            minHeight: 23,
            paddingRight: 4,
            paddingBottom: 5,
            maxHeight: theme.spacing(8),
            overflowY: 'auto!important'
          }
        })}
        variant="filled"
        fullWidth
        placeholder={placeholder}
        value={inputValue}
        multiline
        onKeyPress={handleKeyPress}
        onChange={handleInputChange}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          gap: 1,
          bottom: 28,
          right: 28
        }}>
        {!isWidget && messages?.length ? (
          <Tooltip title="Start new chat">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => startNewChat()}
              data-test-id="new-chat-button">
              <AddIcon />
            </Button>
          </Tooltip>
        ) : null}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!inputValue || isLoading}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatInput;
