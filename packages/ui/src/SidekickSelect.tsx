import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import FormLabel from '@mui/material/FormLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import toSentenceCase from '@utils/utilities/toSentenceCase';
import { Sidekick } from 'types';

interface SidekickSelectProps {
  onSidekickSelected: (sidekick: Sidekick) => void;
}

export const SidekickSelect = ({ onSidekickSelected }: SidekickSelectProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [sidekicks, setSidekicks] = useState<Sidekick[]>([]);
  const defaultTag = toSentenceCase(Cookies.get('tag') || 'Administrative');
  const [selectedTag, setSelectedTag] = useState<string>(toSentenceCase(defaultTag));
  const [selectedSidekick, setSelectedSidekick] = useState<Sidekick | null>(null);
  const [tagSidekicks, setTagSidekicks] = useState<Sidekick[]>([]);

  useEffect(() => {
    const fetchSidekicks = async () => {
      try {
        const response = await axios.get('/api/sidekicks');
        const retrievedSidekicks = response.data;

        // Determine the unique tags based on the retrieved sidekicks
        const iUuniqueTags: string[] = Array.from(
          new Set(
            retrievedSidekicks
              .flatMap((s: Sidekick) => s.tags)
              .filter((tag: string | null): tag is string => tag !== null)
          )
        );

        const uniqueTags = iUuniqueTags.map((tag: string) => toSentenceCase(tag)).sort();

        setTags(uniqueTags);
        setSidekicks(retrievedSidekicks);
      } catch (error) {
        console.error('Error fetching sidekicks:', error);
      }
    };

    fetchSidekicks();
  }, []);

  useEffect(() => {
    if (!!sidekicks?.length && !!selectedTag) {
      const sidekicksInTag = sidekicks
        .filter((s) => s.tags.includes(toSentenceCase(selectedTag)))
        .sort((a, b) => a.label.localeCompare(b.label));
      setTagSidekicks(sidekicksInTag);
      setSelectedSidekick(sidekicksInTag[0]);
    }
  }, [sidekicks, selectedTag]);

  useEffect(() => {
    if (selectedSidekick) {
      onSidekickSelected(selectedSidekick);
      Cookies.set('sidekick', JSON.stringify(selectedSidekick));

      const lastUsedSidekicks = JSON.parse(Cookies.get('lastUsedSidekicks') || '{}');
      lastUsedSidekicks[selectedTag.toLowerCase()] = selectedSidekick;
      Cookies.set('lastUsedSidekicks', JSON.stringify(lastUsedSidekicks));
    }
  }, [selectedSidekick, selectedTag, onSidekickSelected]);

  const handleTagChange = (event: SelectChangeEvent<string>) => {
    const tag = event.target.value;
    setSelectedTag(tag);
    Cookies.set('tag', tag.toLowerCase());
  };

  const handleSidekickChange = (event: SelectChangeEvent<string>) => {
    const sidekickValue = event.target.value;
    const selectedSidekick = tagSidekicks.find((s) => s.id === sidekickValue);
    setSelectedSidekick(selectedSidekick || null);
  };

  return tags.length ? (
    <>
      <FormControl size="small">
        <FormLabel id="tag-select-label" sx={{ pb: 1 }}>
          Tag
        </FormLabel>
        <Select
          labelId="tag-select-label"
          id="tag-select"
          size="small"
          value={selectedTag}
          onChange={handleTagChange}>
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small">
        <FormLabel id="sidekick-select-label" sx={{ pb: 1 }}>
          Sidekick
        </FormLabel>
        <Select
          labelId="sidekick-select-label"
          id="sidekick-select"
          size="small"
          value={selectedSidekick?.id?.toString() ?? ''}
          onChange={handleSidekickChange}>
          {tagSidekicks.map((sidekick) => (
            <MenuItem key={sidekick.id} value={sidekick.id}>
              {sidekick.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  ) : null;
};
