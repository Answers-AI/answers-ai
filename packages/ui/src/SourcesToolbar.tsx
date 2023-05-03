import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { AppSettings, ConfluenceSpace, AppService, Flags } from 'types';

import { AvatarGroup, Box, Popover, Typography } from '@mui/material';
import AutocompleteSelect from './AutocompleteSelect';
import { useAnswers } from './AnswersContext';
import { useFlags } from 'flagsmith/react';
import Image from 'next/image';
import SourcesWeb from './SourcesWeb';

export default function BadgeAvatars({ appSettings }: { appSettings: AppSettings }) {
  const serviceRefs = React.useRef<{ [key: string]: HTMLDivElement }>({});
  const flags = useFlags(['airtable', 'docubot']) as Flags;
  const enabledServices: AppService[] | undefined = appSettings?.services?.filter(
    (service) => {
    const isServiceEnabledInFlags = flags?.[service.name]?.enabled;
    return service.enabled && (isServiceEnabledInFlags === undefined || isServiceEnabledInFlags);
  }
  );
  

  const [serviceOpen, setServiceOpen] = React.useState<string>('');
  const { filters, updateFilter } = useAnswers();
  const selectedService = enabledServices?.find((service) => service.name === serviceOpen);

  return (
    <>
      <AvatarGroup total={enabledServices?.length} max={10} spacing={-8}>
        {enabledServices
          ?.map((service, idx) => [
            <Avatar
              key={service.name}
              alt={service.name}
              ref={(ref) => {
                if (ref) serviceRefs.current[service.name] = ref;
              }}
              onClick={() => setServiceOpen(service.name)}>
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
          anchorEl={serviceRefs.current[serviceOpen]}
          onClose={() => setServiceOpen('')}
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
              {serviceOpen} filters
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'column'
              }}>
              {serviceOpen === 'slack' ? (
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

              {serviceOpen === 'web' ? <SourcesWeb /> : null}

              {serviceOpen === 'jira' ? (
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
