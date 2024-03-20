import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Fieldset from './Fieldset';
import type { Sidekick } from 'types';

interface SidekickSelectProps {
  onSidekickSelected: (sidekick: Sidekick) => void;
  sidekicks?: Sidekick[];
}

const SidekickSelect = ({ onSidekickSelected, sidekicks = [] }: SidekickSelectProps) => {
  const [selectedSidekick, setSelectedSidekick] = useState<number>(0);

  useEffect(() => {
    const sidekickHistory = JSON.parse(Cookies.get('sidekickHistory') || '{}');
    const lastUsedSidekick = sidekickHistory?.lastUsed;
    const sidekickIdx = sidekicks.findIndex((s) => s.id === lastUsedSidekick?.id);
    const curSidekick = sidekicks[sidekickIdx];
    console.log('Effect', { sidekickIdx, curSidekick });
    if (sidekickIdx == -1 || sidekicks?.length === 0) return;
    setSelectedSidekick(sidekickIdx);
    onSidekickSelected(sidekicks[sidekickIdx]);
  }, [sidekicks, onSidekickSelected]);

  const handleSidekickChange = (event: SelectChangeEvent<string>) => {
    const sidekickIdx = parseInt(event.target.value);
    const curSidekick = sidekicks[sidekickIdx];
    console.log('handleSidekickChange', { sidekickIdx, curSidekick, value: event.target.value });

    setSelectedSidekick(sidekickIdx);
    if (curSidekick) {
      onSidekickSelected(curSidekick);
    }

    const sidekickHistory = JSON.parse(Cookies.get('sidekickHistory') || '{}');
    sidekickHistory.lastUsed = curSidekick;
    Cookies.set('sidekickHistory', JSON.stringify(sidekickHistory));
  };

  const sortedSidekicks = [...sidekicks].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <>
      <Fieldset legend="Sidekick">
        <Select
          labelId="sidekick-select-label"
          id="sidekick-select"
          size="small"
          sx={{ 'boxShadow': 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
          value={selectedSidekick?.toString()}
          onChange={handleSidekickChange}>
          {sortedSidekicks.map((sidekick: Sidekick, idx: number) => (
            <MenuItem key={sidekick.id} value={idx}>
              {sidekick.label}
            </MenuItem>
          ))}
        </Select>
      </Fieldset>
    </>
  );
};

export default SidekickSelect;
