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
  const [selectedSidekick, setSelectedSidekick] = useState<string>('');

  useEffect(() => {
    const sidekickHistory = JSON.parse(Cookies.get('sidekickHistory') || '{}');
    const lastUsedSidekick = sidekickHistory?.lastUsed;
    const sidekick = sidekicks.find((s) => s.id === lastUsedSidekick) ?? sidekicks[0];

    setSelectedSidekick(sidekick.id);
    onSidekickSelected(sidekick);
  }, [sidekicks, onSidekickSelected]);

  const handleSidekickChange = (event: SelectChangeEvent<string>) => {
    const sidekickValue = event.target.value;
    setSelectedSidekick(sidekickValue);

    const curSidekick = sidekicks.find((s: Sidekick) => s?.id === sidekickValue);
    if (curSidekick) {
      onSidekickSelected(curSidekick);
    }

    const sidekickHistory = JSON.parse(Cookies.get('sidekickHistory') || '{}');
    sidekickHistory.lastUsed = sidekickValue;
    Cookies.set('sidekickHistory', JSON.stringify(sidekickHistory));
  };

  return (
    <>
      <Fieldset legend="Sidekick">
        <Select
          labelId="sidekick-select-label"
          id="sidekick-select"
          size="small"
          sx={{ 'boxShadow': 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
          value={selectedSidekick ?? ''}
          onChange={handleSidekickChange}>
          {sidekicks.map((sidekick: Sidekick) => (
            <MenuItem key={sidekick.id} value={sidekick.id}>
              {sidekick.label}
            </MenuItem>
          ))}
        </Select>
      </Fieldset>
    </>
  );
};

export default SidekickSelect;
