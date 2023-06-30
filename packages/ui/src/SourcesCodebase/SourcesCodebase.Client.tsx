'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@ui/AutocompleteSelect';
import { Document } from 'types';
import { useAnswers } from '@ui/AnswersContext';

import useSWR from 'swr';

const SourcesCodebase: React.FC<{}> = ({}) => {
  const source = 'codebase';
  const { filters, updateFilter } = useAnswers();
  const { data, mutate } = useSWR<{
    sources: Document[];
  }>(`/api/sources?source=${source}`, (url) => fetch(url).then((res) => res.json()));

  const { sources } = data || {};

  return (
    <>
      <Box marginBottom={1} sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Autocomplete
          label="Choose a repo"
          value={filters?.datasources?.codebase?.repo || []}
          onChange={(value) => updateFilter({ datasources: { codebase: { repo: value } } })}
          getOptionLabel={(option) => (option?.metadata as any)?.repo!}
          getOptionValue={(option) => (option?.metadata as any)?.repo!}
          options={sources ?? []}
          onFocus={() => mutate()}
        />
      </Box>
    </>
  );
};

export default SourcesCodebase;
