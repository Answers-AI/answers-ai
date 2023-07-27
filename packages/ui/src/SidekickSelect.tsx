import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import toSentenceCase from '@utils/utilities/toSentenceCase';
import Fieldset from './Fieldset';
import { Sidekick } from 'types';

interface SidekickSelectProps {
  onSidekickSelected: (sidekick: Sidekick) => void;
}

export const SidekickSelect = ({ onSidekickSelected }: SidekickSelectProps) => {
  const [allSidekicks, setAllSidekicks] = useState<Sidekick[]>([]);
  const [selectedSidekick, setSelectedSidekick] = useState<string>('');

  useEffect(() => {
    
    const fetchSidekicks = async () => {
      try {
        const response = await axios.get('/api/sidekicks/list/chat');
        const retrievedSidekicks: Sidekick[] = response.data;

        retrievedSidekicks.forEach((s: Sidekick) => {
          s.tags = s.tags.map((t) => toSentenceCase(t));
        });

        // Determine the unique tags based on the retrieved sidekicks
        const uniqueTags: string[] = Array.from(
          new Set(
            retrievedSidekicks
              .flatMap((s: Sidekick) => s.tags)
              .filter((tag: string | null): tag is string => tag !== null)
          )
        ).sort();

        const sidekickHistory = JSON.parse(Cookies.get('sidekickHistory') || '{}');
        const lastUsedSidekick = sidekickHistory?.lastUsed;
        const sidekickToSet = (lastUsedSidekick && retrievedSidekicks.some(s => s.id === lastUsedSidekick))
                              ? lastUsedSidekick 
                              : retrievedSidekicks[0]?.id;

        setSelectedSidekick(sidekickToSet);
        setAllSidekicks(retrievedSidekicks);
      } catch (error) {
        console.error('Error fetching sidekicks:', error);
      }
    };

    fetchSidekicks();
  }, []);

  useEffect(() => {
    const sidekickHistory = JSON.parse(Cookies.get('sidekickHistory') || '{}');
    const lastUsedSidekick = sidekickHistory?.lastUsed;

    if (lastUsedSidekick === allSidekicks[0]?.id || !lastUsedSidekick){
      return;
    }
  
    const sidekick = lastUsedSidekick ?? allSidekicks[0]?.id;

  
    const sidekickToSet = (lastUsedSidekick && allSidekicks.some(s => s.id === lastUsedSidekick))
                       ? lastUsedSidekick 
                       : allSidekicks[0]?.id;

    setSelectedSidekick(sidekickToSet);
  
    const curSidekick = allSidekicks.find((s: Sidekick) => s?.id === sidekick);
    if (curSidekick) {
      onSidekickSelected(curSidekick);
    }
  
    sidekickHistory.lastUsed = sidekick;
    Cookies.set('sidekickHistory', JSON.stringify(sidekickHistory));
  }, [allSidekicks, onSidekickSelected]);


  const handleSidekickChange = (event: SelectChangeEvent<string>) => {
    const sidekickValue = event.target.value;
    setSelectedSidekick(sidekickValue);

    const curSidekick = allSidekicks.find((s: Sidekick) => s?.id === sidekickValue);
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
          {allSidekicks?.length ? (
            allSidekicks.map((sidekick) => (
              <MenuItem key={sidekick.id} value={sidekick.id}>
                {sidekick.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem>Loading Sidekicks</MenuItem>
          )}
        </Select>
      </Fieldset>
    </>
  );
};
