'use client';
import React from 'react';
import { Box } from '@mui/material';
import Autocomplete from '@ui/AutocompleteSelect';
import { Document } from 'types';
import { useAnswers } from '@ui/AnswersContext';

import useSWR from 'swr';

const SourcesCodebase: React.FC<{}> = ({}) => {
  const { filters, updateFilter } = useAnswers();
  const { data, error, isLoading, mutate } = useSWR<{
    sources: Document[];
    domains: { domain: string; pageCount: number }[];
  }>(`/api/sources?source=codebase`, (url) => fetch(url).then((res) => res.json()));

  const { sources } = data || {};

  return (
    <>
      <Box marginBottom={1} sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Autocomplete
          label={'Choose a repo'}
          placeholder={`My repo`}
          value={filters?.datasources?.codebase?.repo || []}
          onChange={(value) => updateFilter({ datasources: { codebase: { repo: value } } })}
          getOptionLabel={(option) => option?.title ?? option?.url}
          getOptionValue={(option) => option?.url}
          options={sources ?? []}
          onFocus={() => mutate()}
        />
      </Box>
    </>
  );
};

export default SourcesCodebase;
