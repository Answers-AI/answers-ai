import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Chip,
  Collapse,
  FormControlLabel,
  List,
  ListItem,
  Switch,
  TextField
} from '@mui/material';
import { WebUrlType, Document } from 'types';
import { useAnswers } from './AnswersContext';
import { getUrlDomain } from '@utils/getUrlDomain';
import { getUniqueUrls } from '@utils/getUniqueUrls';

interface SourceUrl {
  id: string;
  url: string;
  domain: string;
}

const groupByDomain = (data: string[]) => {
  const groups: { [key: string]: SourceUrl[] } = {};

  data.forEach((webUrl) => {
    const domain = getUrlDomain(webUrl);
    if (!groups[domain]) {
      groups[domain] = [];
    }
    groups[domain].push({ id: webUrl, url: webUrl, domain });
  });

  return groups;
};

const SourcesWeb: React.FC<{}> = ({ documents: Document }) => {
  const { filters, updateFilter } = useAnswers();

  const activeUrls = filters?.datasources?.web?.url?.map((webUrl) => webUrl.url) || [];
  // const [activeDomains, setActiveDomains] = useState<string[]>([]);
  const [allUrls, setAllUrls] = useState<string[]>(activeUrls);
  const [newUrl, setNewUrl] = useState('');
  const [entireDomain, setEntireDomain] = useState(false);
  const domainGroups = groupByDomain(allUrls || []);

  const handleAddUrl = async () => {
    const newWebUrl = { url: newUrl, entireDomain };

    if (newWebUrl) {
      const newWebURLs = [...(filters?.datasources?.web?.url ?? []), newWebUrl];
      updateFilter({
        datasources: { web: { url: newWebURLs } }
      });
      setAllUrls(getUniqueUrls([...allUrls, newUrl]));

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

  // const toggleDomain = (domain: string) => {
  //   if (activeDomains.includes(domain)) {
  //     setActiveDomains(activeDomains.filter((d) => d !== domain));
  //     setAllUrls(allUrls.filter((url) => !url.startsWith(domain)));
  //   } else {
  //     setActiveDomains([...activeDomains, domain]);
  //     setAllUrls([...allUrls, ...domainGroups[domain].map((d) => d.url)]);
  //   }
  // };

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

  return (
    <>
      <Box marginBottom={1}>
        <TextField
          label="URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          size="small"
          variant="outlined"
          fullWidth
        />
        <Box display="flex" alignItems="spaceBetween" marginTop={1}>
          <FormControlLabel
            control={
              <Switch
                checked={entireDomain}
                onChange={(e) => setEntireDomain(e.target.checked)}
                color="primary"
              />
            }
            label="Entire Domain"
            labelPlacement="start"
          />
          <Button variant="contained" color="success" size="small" onClick={handleAddUrl}>
            Add
          </Button>
        </Box>
      </Box>
      <List>
        {Object.entries(domainGroups).map(([domain, urls]) => (
          <div key={domain}>
            {/* <ListItem sx={{ padding: 0 }}>
              <Chip
                label={domain}
                onClick={() => toggleDomain(domain)}
                sx={{
                  bgcolor: activeDomains.includes(domain) ? 'success.main' : 'rgba(0, 0, 0, 0)'
                }}
              />
            </ListItem> */}
            <Collapse in>
              {/* ={activeDomains.includes(domain)} && !activeDomains.includes(urls[0]?.domain)}> */}
              <List sx={{ gap: 0.25 }}>
                {urls.map((webUrl) => (
                  <ListItem key={webUrl.id} sx={{ px: 0, py: 0 }}>
                    <Chip
                      sx={{
                        bgcolor: activeUrls.includes(webUrl.url)
                          ? 'success.main'
                          : 'rgba(0, 0, 0, 0)'
                      }}
                      size="small"
                      label={webUrl.url}
                      onClick={() => toggleUrl(webUrl.url)}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </>
  );
};

export default SourcesWeb;
