import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
import { AppSettings, ConfluenceSpace } from 'types';
import { AvatarGroup, Box, Popover, Typography } from '@mui/material';
import AutocompleteSelect from './AutocompleteSelect';
import { useAnswers } from './AnswersContext';
import { getUniqueUrls } from '@utils/utilities/getUniqueUrls';
import { useFlags } from 'flagsmith/react';
import axios from 'axios';
import Image from 'next/image';

export default function BadgeAvatars({ appSettings }: { appSettings: AppSettings }) {
  const anchorRef = React.useRef<HTMLDivElement[]>([]);
  const flags = useFlags(['airtable', 'docubot']);
  const enabledServices = appSettings?.services?.filter((service) => {
    const isServiceEnabledInFlags = flags?.[service.name]?.enabled;
    return service.enabled && (isServiceEnabledInFlags === undefined || isServiceEnabledInFlags);
  });
  
  const [open, setOpen] = React.useState(-1);
  const [urls, setUrls] = React.useState<string[]>([]);
  const [domains, setDomains] = React.useState<string[]>([]);
  const { filters, updateFilter } = useAnswers();

  const spacesById: Record<string, ConfluenceSpace> = React.useMemo(
    () =>
      appSettings?.confluence?.spaces?.reduce(
        (accum, space) => ({
          ...accum,
          [space.id]: space
        }),
        {}
      ) ?? {},
    [appSettings?.confluence?.spaces]
  );

  React.useEffect(() => {
    const getUrls = async () => {
      try {
        const webUrls = await axios.post(`/api/ai/getUrlList`);

        if (webUrls?.data?.urls && webUrls?.data?.urls?.length > 0) {
          setUrls(webUrls.data.urls);
        } else {
          setUrls([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUrls();

    const getDomains = async () => {
      try {
        console.log('getDomains');
        const webDomains = await axios.post(`/api/ai/getDomainList`);

        if (webDomains?.data?.domains && webDomains?.data?.domains?.length > 0) {
          setDomains(webDomains.data.domains);
        } else {
          setDomains([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDomains();
  }, []);

  const selectedService = enabledServices?.[open];
  return (
    <>
      <AvatarGroup total={enabledServices?.length} max={10} spacing={-8}>
        {enabledServices
          ?.map((service, idx) => [
            <Avatar
              // sx={{ obejctFit: 'contain' }}

              key={service.name}
              alt={service.name}
              ref={(ref) => {
                if (ref) anchorRef.current[idx] = ref;
              }}
              onClick={() => setOpen(idx)}>
              <Image
                style={{ background: 'white', padding: '8px' }}
                src={service.imageURL}
                alt={`${service.name} logo`}
                width={40}
                height={40}
              />
            </Avatar>
          ])
          .flat()}
      </AvatarGroup>
      {selectedService ? (
        <Popover
          key={selectedService?.name}
          open
          anchorEl={anchorRef.current[open]}
          onClose={() => setOpen(-1)}
          PaperProps={{
            sx: {
              marginLeft: '-2px',
              marginTop: '-4px'
            }
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}>
          <Box sx={{ width: 320, px: 2, py: 2 }}>
            <Typography variant="overline" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
              {selectedService.name} filters
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'column'
              }}>
              {selectedService.name === 'slack' ? (
                <>
                  <AutocompleteSelect
                    label="Channel"
                    options={
                      appSettings?.slack?.channels?.filter((s) => s.enabled)?.map((s) => s.name) ||
                      []
                    }
                    value={filters?.datasources?.slack?.channelId || []}
                    onChange={(value: string[]) =>
                      updateFilter({ datasources: { slack: { channelId: value } } })
                    }
                  />
                </>
              ) : null}
              {(flags?.docubot?.enabled && selectedService.name === 'docubot') ? (  
                <>
                  {console.log(appSettings)}
                  <AutocompleteSelect
                    label="Repository"
                    options={
                      appSettings?.docubot?.repos?.filter((s) => s.enabled)?.map((s) => s.id) || []
                    }
                    value={filters?.datasources?.docubot?.repo || []}
                    onChange={(value: string[]) =>
                      updateFilter({ datasources: { docubot: { repo: value } } })
                    }
                  />
                </>
              ) : null}
              {(flags?.airtable?.enabled && selectedService.name === 'airtable') ? (
                <>
                  {console.log(appSettings)}
                  <AutocompleteSelect
                    label="Table"
                    options={
                      appSettings?.airtable?.tables?.filter((s) => s.enabled)?.map((s) => s.id) || []
                    }
                    value={filters?.datasources?.airtable?.table || []}
                    onChange={(value: string[]) =>
                      updateFilter({ datasources: { airtable: { table: value } } })
                    }
                  />
                </>
              ) : null}
              {selectedService.name === 'confluence' ? (
                <>
                  <AutocompleteSelect
                    label="Confluence Space"
                    options={appSettings?.confluence?.spaces?.filter((s) => s.enabled) || []}
                    // getOptionValue={(option) => {
                    //   return option?.id;
                    // }}
                    getOptionLabel={(option) => {
                      return option?.name;
                    }}
                    value={filters?.datasources?.confluence?.spaces ?? []}
                    onChange={(value) =>
                      updateFilter({
                        datasources: {
                          confluence: { spaces: value || [] }
                        }
                      })
                    }
                  />
                </>
              ) : null}
              {selectedService.name === 'web' ? (
                <>
                  <AutocompleteSelect
                    label="Web Page"
                    options={urls}
                    // options={appSettings?.web?.urls?.map((s) => s.url) || []}
                    value={filters?.datasources?.web?.url || []}
                    onChange={async (value: string[]) => {
                      const currentUrls = filters?.datasources?.web?.url || [];
                      const newUrls = value.filter((v) => !currentUrls.includes(v));
                      updateFilter({ datasources: { web: { url: value } } });
                      if (!newUrls?.length) return;
                      const uniqueUrls = getUniqueUrls(newUrls);
                      await axios.post(`/api/sync/web`, { urls: uniqueUrls, byDomain: false });
                    }}
                  />
                  <AutocompleteSelect
                    label="Web Site"
                    options={domains}
                    // options={appSettings?.web?.urls?.map((s) => s.url) || []}
                    value={filters?.datasources?.web?.domain || []}
                    onChange={async (value: string[]) => {
                      // const currentUrls = filters?.datasources?.web?.domain || [];
                      // const newUrls = value.filter((v) => !currentUrls.includes(v));
                      updateFilter({ datasources: { web: { domain: value } } });
                      // if (!newUrls?.length) return;
                      // const uniqueUrls = getUniqueUrls(newUrls);
                      // await axios.post(`/api/sync/web`, { urls: uniqueUrls, byDomain: true });
                    }}
                  />
                </>
              ) : null}
              {selectedService.name === 'jira' ? (
                <>
                  <AutocompleteSelect
                    label="Project"
                    options={
                      appSettings?.jira?.projects?.filter((s) => s.enabled)?.map((s) => s.key) || []
                    }
                    value={filters?.datasources?.jira?.project || []}
                    onChange={(value: string[]) =>
                      updateFilter({ datasources: { jira: { project: value } } })
                    }
                  />
                  <AutocompleteSelect
                    label={`Status`}
                    sx={{ textTransform: 'capitalize' }}
                    options={['to do', 'in progress', 'done']}
                    value={filters?.datasources?.jira?.status_category || []}
                    onChange={(value: string[]) => {
                      updateFilter({ datasources: { jira: { status_category: value } } });
                    }}
                  />
                  {/* <AutocompleteSelect
                    label={`Assignee`}
                    sx={{ textTransform: 'capitalize' }}
                    options={[
                      'adam harris',
                      'brad taylor',
                      'camilo rios',
                      'cecilia widmer',
                      'dano alexander',
                      'jaime morales',
                      'justin whitley',
                      'maximiliano techera',
                      'tony leung',
                      'unassigned'
                    ]}
                    value={filters?.datasources?.jira?.assignee || []}
                    onChange={(value: string[]) =>
                      updateFilter({ datasources: { jira: { assignee: value } } })
                    }
                  /> */}
                </>
              ) : null}
            </Box>
          </Box>
        </Popover>
      ) : null}
    </>
  );
}
