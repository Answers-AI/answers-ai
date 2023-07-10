'use client';
import React from 'react';
import useSWR from 'swr';

import Box from '@mui/material/Box';

import Autocomplete from '../AutocompleteSelect';
import { useAnswers } from '../AnswersContext';

import { Document } from 'types';

const SourcesCodebase: React.FC<{}> = ({}) => {
  const { filters, updateFilter } = useAnswers();
  const { data, mutate } = useSWR<{
    sources: Document[];
  }>(`/api/sources/codebase`, (doc) => fetch(doc).then((res) => res.json()));

  const { sources } = data || {};

  return (
    <>
      <Box marginBottom={1} sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Autocomplete
          label="Choose a repo"
          value={filters?.datasources?.codebase?.repo || []}
          onChange={(value) => updateFilter({ datasources: { codebase: { repo: value } } })}
          getOptionLabel={(option) => (option?.metadata as any)?.repo!}
          options={sources ?? []}
          onFocus={() => mutate()}
        />
      </Box>
    </>
  );
};

export default SourcesCodebase;
