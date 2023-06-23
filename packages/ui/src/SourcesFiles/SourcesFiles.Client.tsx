'use client';
import React from 'react';
import { Box } from '@mui/material';
import Autocomplete from '@ui/AutocompleteSelect';
import { Document } from 'types';
import { useAnswers } from '@ui/AnswersContext';
import NewFileModal from './NewFileModal';

import useSWR from 'swr';

const SourcesFiles: React.FC<{}> = ({}) => {
  const { filters, updateFilter } = useAnswers();
  const { data, error, isLoading, mutate } = useSWR<{
    sources: Document[];
    domains: { domain: string; pageCount: number }[];
  }>(`/api/sources?source=file`, (url) => fetch(url).then((res) => res.json()));

  const { sources } = data || {};

  return (
    <>
      <Box marginBottom={1} sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Autocomplete
          label={'Choose file'}
          placeholder={`My custom file`}
          value={filters?.datasources?.file?.url || []}
          onChange={(value) => updateFilter({ datasources: { file: { url: value } } })}
          getOptionLabel={(option) => option?.title ?? option?.url}
          getOptionValue={(option) => option?.url}
          options={sources ?? []}
          onFocus={() => mutate()}
        />
        <NewFileModal
          onSave={() => {
            setTimeout(mutate, 2000);
          }}
        />
      </Box>
    </>
  );
};

export default SourcesFiles;
