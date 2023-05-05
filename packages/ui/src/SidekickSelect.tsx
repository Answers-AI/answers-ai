import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandLess';
import { Prompt } from 'types';
import PromptCard from './PromptCard';
import { sidekicks } from '@utils/sidekicks';
import { useAnswers } from './AnswersContext';

interface SidekickSelectProps {
  onSidekickSelected: (value: string) => void;
  selectedSidekick: string;
}

export const SidekickSelect = ({ onSidekickSelected, selectedSidekick }: SidekickSelectProps) => {
  const handleSidekickChange = (event: SelectChangeEvent<string>) => {
    onSidekickSelected(event.target.value);
  };

  return sidekicks?.length ? (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Sidekick"
      value={selectedSidekick}
      onChange={handleSidekickChange}>
      {sidekicks.map((sidekick) => (
        <MenuItem key={sidekick.value} value={sidekick.value}>
          {sidekick.label}
        </MenuItem>
      ))}
    </Select>
  ) : null;
};
