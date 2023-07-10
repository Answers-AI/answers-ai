'use client';
import React from 'react';

import useSWR from 'swr';

import Box from '@mui/material/Box';

import Autocomplete from '../AutocompleteSelect';
import { useAnswers } from '../AnswersContext';
import NewDocumentModal from '../NewDocumentModal';

import { Document } from 'types';

const SourcesFile: React.FC<{}> = ({}) => {
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
          value={filters?.datasources?.file?.url!}
          onChange={(value) => updateFilter({ datasources: { file: { url: value } } })}
          getOptionLabel={(option) => option?.title ?? option?.url}
          options={sources ?? []}
          onFocus={() => mutate()}
        />
        <NewDocumentModal
          source="file"
          onSave={() => {
            setTimeout(mutate, 2000);
          }}
        />
      </Box>
    </>
  );
};

export default SourcesFile;
