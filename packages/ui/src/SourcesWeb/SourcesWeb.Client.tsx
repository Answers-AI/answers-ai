'use client';
import React, { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { getUrlDomain } from '@utils/getUrlDomain';
import { throttle } from '@utils/throttle';

import Autocomplete from '../VirtualAutocomplete';
import { useAnswers } from '../AnswersContext';

import DomainCard from './DomainCard';

import { WebUrlType, Document } from 'types';

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

const SourcesWeb: React.FC<{}> = ({}) => {
  const { filters, updateFilter } = useAnswers();

  const activeUrls = filters?.datasources?.web?.url?.map((webUrl) => webUrl.url) || [];
  // const [activeDomains, setActiveDomains] = useState<string[]>([]);
  const [allUrls, setAllUrls] = useState<string[]>(activeUrls);
  const [newUrl, setNewUrl] = useState('');
  const [entireDomain, setEntireDomain] = useState(false);

  const [url, setUrl] = useState<string>('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateUrl = React.useCallback(throttle(setUrl, 600), []);
  const { data, error, isLoading, mutate } = useSWR<{
    sources: Document[];
    domains: { domain: string; pageCount: number }[];
  }>(url?.length > 10 ? `/api/sources/web?url=${url}` : null, (url) =>
    fetch(url).then((res) => res.json())
  );

  const { sources, domains } = data || {};
  const domainGroups = groupByDomain(sources?.map((source) => source.url) || []);

  const handleAddUrl = async (newWebUrl: { url: string; entireDomain?: boolean }) => {
    // const newWebUrl = { url: newUrl, entireDomain };

    if (newWebUrl) {
      if (!newWebUrl.entireDomain) {
        const newWebURLs = [...(filters?.datasources?.web?.url ?? []), newWebUrl];
        updateFilter({
          datasources: { web: { url: newWebURLs } }
        });
      } else {
        const newDomains = [...(filters?.datasources?.web?.domain ?? []), newWebUrl.url];
        updateFilter({
          datasources: { web: { domain: newDomains } }
        });
      }
      // setAllUrls(getUniqueUrls([...allUrls, newUrl]));

      const urlRespn = await axios.post(`/api/sync/web`, {
        urls: [newWebUrl.url],

        byDomain: newWebUrl.entireDomain
      });
      setNewUrl('');
      setEntireDomain(false);
    }
  };

  const handleRemoveUrl = async (webUrl: WebUrlType) => {
    if (webUrl) {
      const domain = getUrlDomain(webUrl.url);

      const newWebURLs = (filters?.datasources?.web?.url ?? []).filter((urlObj) => {
        if (webUrl.entireDomain) {
          return getUrlDomain(urlObj.url) !== domain;
        } else {
          return urlObj.url !== webUrl.url;
        }
      });

      updateFilter({
        datasources: { web: { url: newWebURLs } }
      });
    }
  };

  const handleRemoveDomain = async (domain: string) => {
    const newDomain = (filters?.datasources?.web?.domain ?? []).filter((d) => {
      return domain !== d;
    });

    updateFilter({
      datasources: { web: { domain: newDomain } }
    });
  };

  const toggleUrl = (url: string) => {
    if (activeUrls.includes(url)) {
      // setAllUrls(allUrls.filter((u) => u !== url));
      handleRemoveUrl({ url });
    } else {
      const newWebURLs = [...(filters?.datasources?.web?.url ?? []), { url, entireDomain: false }];
      updateFilter({
        datasources: { web: { url: newWebURLs } }
      });
      // setAllUrls(getUniqueUrls([...allUrls, url]));
    }
  };

  const addDomainFilter = async (domain?: string) => {
    if (!domain) return;
    const newDomains = [...(filters?.datasources?.web?.domain ?? []), domain];
    updateFilter({
      datasources: { web: { domain: newDomains } }
    });
    await axios.post(`/api/sync/web`, {
      urls: [domain],
      byDomain: true
    });
    await mutate();
  };

  return (
    <>
      <Box marginBottom={1} sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        {filters?.datasources?.web?.domain?.length ? (
          <Box>
            <Typography variant="overline">Domains</Typography>
            <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
              {filters?.datasources?.web?.domain?.map((domain) => (
                <Chip size="small" label={domain} onDelete={() => handleRemoveDomain(domain)} />
              ))}
            </Box>
          </Box>
        ) : null}

        {filters?.datasources?.web?.url?.length ? (
          <Box>
            <Typography variant="overline">Pages</Typography>
            <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
              {filters?.datasources?.web?.url?.map((url) => (
                <Chip
                  key={url.url}
                  size="small"
                  label={url.url}
                  onDelete={() => handleRemoveUrl(url)}
                />
              ))}
            </Box>
          </Box>
        ) : null}
        <Autocomplete
          freeSolo
          options={
            isDomain(newUrl)
              ? []
              : newUrl
              ? [...(sources?.map((source) => source.url) ?? [])]
              : sources?.map((source) => source.url) ?? []
          }
          onInputChange={(e: any, value: any) => {
            setNewUrl(value);
            updateUrl(value);
          }}
          onChange={(e: any, value: any) => {
            if (value) {
              handleAddUrl({ url: value, entireDomain: false });

              setNewUrl('');
            }
          }}
          selectOnFocus
          // clearOnBlur
          renderInput={(params: any) => (
            <TextField
              {...params}
              label="URL"
              value={newUrl}
              // onChange={(e) => {
              //   setNewUrl(e.target.value);
              //   updateUrl(e.target.value);
              // }}
              sx={{ minHeight: 56 }}
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Box>
      {domains?.length ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 1 }}>
          {domains.map(({ domain, pageCount }) =>
            filters?.datasources?.web?.domain?.includes(domain) ? null : (
              <DomainCard
                key={domain}
                domain={domain}
                pageCount={pageCount}
                onClick={() => addDomainFilter(domain)}
              />
            )
          )}
        </Box>
      ) : null}
      {getUrlDomain(newUrl) &&
      !domains?.length &&
      !filters?.datasources?.web?.domain?.includes(getUrlDomain(newUrl)!) ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 1 }}>
          <DomainCard
            domain={getUrlDomain(newUrl)}
            urls={[]}
            onClick={() => addDomainFilter(getUrlDomain(newUrl))}
          />
        </Box>
      ) : null}

      {/* {sources?.length ? <DocumentTree documents={sources} /> : null} */}
    </>
  );
};

export default SourcesWeb;
