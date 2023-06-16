'use client';
import React from 'react';
import { Box } from '@mui/material';
import Autocomplete from '@ui/AutocompleteSelect';
import { Document } from 'types';
import { useAnswers } from '@ui/AnswersContext';
import { getUrlDomain } from '@utils/getUrlDomain';
import NewFileModal from './NewFileModal';

import useSWR from 'swr';

const isDomain = (url?: string) => {
  try {
    if (!url) return false;
    const domain = getUrlDomain(url);
    return domain === url;
  } catch (err) {
    return false;
  }
};
interface SourceUrl {
  id: string;
  url: string;
  domain: string;
}

const groupByDomain = (data: string[]) => {
  const groups: { [key: string]: SourceUrl[] } = {};

  data.forEach((webUrl) => {
    const domain = getUrlDomain(webUrl);
    if (domain) {
      if (!groups[domain]) {
        groups[domain] = [];
      }
      groups[domain].push({ id: webUrl, url: webUrl, domain });
    }
  });

  return groups;
};

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
          label={'File URL'}
          value={filters?.datasources?.file?.url || []}
          onChange={(value) => updateFilter({ datasources: { file: { url: value } } })}
          getOptionLabel={(option) => option?.title ?? option?.url}
          getOptionValue={(option) => option?.url}
          options={sources ?? []}
        />
        <NewFileModal />
      </Box>
    </>
  );
};

export default SourcesFiles;
