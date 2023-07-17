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
  const [allTags, setAllTags] = useState<string[] | null>(null);
  const [allSidekicks, setAllSidekicks] = useState<Sidekick[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSidekick, setSelectedSidekick] = useState<string>('');
  const [tagSidekicks, setTagSidekicks] = useState<Sidekick[]>([]);

  useEffect(() => {
    const fetchSidekicks = async () => {
      try {
        const response = await axios.get('/api/sidekicks/list/favorite');
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

        setAllTags(uniqueTags);
        setAllSidekicks(retrievedSidekicks);
      } catch (error) {
        console.error('Error fetching sidekicks:', error);
      }
    };

    fetchSidekicks();
  }, []);

  useEffect(() => {
    if (!allTags?.length) return;

    const sidekickHistory = JSON.parse(Cookies.get('sidekickHistory') || '{}');
    const tags = sidekickHistory?.lastUsed?.tags?.filter((tag: string) => allTags.includes(tag));

    if (tags?.length) {
      setSelectedTags(tags);
      const sidekick = sidekickHistory?.lastUsed?.sidekick;

      if (sidekick) {
        setSelectedSidekick(sidekick);
      } else {
        setSelectedSidekick('');
      }
    } else if (allTags?.length) {
      setSelectedTags([allTags[0]]);
    }
  }, [allTags]);

  useEffect(() => {
    if (!allSidekicks?.length || !selectedTags) return;

    const sidekicksInTag = allSidekicks
      .filter((s) =>
        selectedTags.some((tag) => s.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()))
      )
      .sort((a, b) => a.label.localeCompare(b.label));

    if (!sidekicksInTag?.length) return;

    setTagSidekicks(sidekicksInTag);

    const sidekickHistory = JSON.parse(Cookies.get('sidekickHistory') || '{}');
    const sidekick = sidekickHistory?.lastUsed?.sidekick;
    setSelectedSidekick(
      sidekicksInTag.some((s) => s.id === sidekick) ? sidekick : sidekicksInTag[0].id
    );
  }, [allSidekicks, selectedTags]);

  const handleTagChange = (event: SelectChangeEvent<string[]>) => {
    const tagsValue = event.target.value;
    let tags = Array.isArray(tagsValue) ? tagsValue : [tagsValue];
    setSelectedTags(tags);
  };

  const handleSidekickChange = (event: SelectChangeEvent<string>) => {
    const sidekickValue = event.target.value;
    setSelectedSidekick(sidekickValue);
    onSidekickSelected(
      sidekicksInTag.some((s) => s.id === sidekick) ? sidekick : sidekicksInTag[0].id
    );

    const sidekickHistory = JSON.parse(Cookies.get('sidekickHistory') || '{}');
    sidekickHistory.lastUsed = {
      tags: selectedTags,
      sidekick: sidekickValue
    };
    sidekickHistory[selectedTags.join(',')] = sidekickValue;
    Cookies.set('sidekickHistory', JSON.stringify(sidekickHistory));
  };

  return (
    <>
      <Fieldset legend="Tag(s)">
        <Select
          labelId="tag-select-label"
          id="tag-select"
          size="small"
          sx={{ 'boxShadow': 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
          value={selectedTags}
          multiple
          onChange={handleTagChange}>
          {allTags?.length ? (
            allTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))
          ) : (
            <MenuItem>Loading Tags</MenuItem>
          )}
        </Select>
      </Fieldset>

      <Fieldset legend="Sidekick">
        <Select
          labelId="sidekick-select-label"
          id="sidekick-select"
          size="small"
          sx={{ 'boxShadow': 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
          value={selectedSidekick ?? ''}
          onChange={handleSidekickChange}>
          {tagSidekicks?.length ? (
            tagSidekicks.map((sidekick) => (
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
