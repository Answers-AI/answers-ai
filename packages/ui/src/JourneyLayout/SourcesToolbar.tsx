import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { AppSettings, AppService } from 'types';

import { AvatarGroup, Box, Popover, Typography } from '@mui/material';
import { useAnswers } from '../AnswersContext';
import { useFlags } from 'flagsmith/react';
import Image from 'next/image';
import JourneySetting from './JourneySetting';
import SourcesWeb from '../SourcesWeb';
import SourcesFiles from '../SourcesFiles';
import AutocompleteSelect from '@ui/AutocompleteSelect';
// import SourcesJira from './SourcesJira';
// import SourcesConfluence from './SourcesConfluence';
// import SourcesAirtable from './SourcesAirtable';
// import SourcesDocubot from './SourcesDocubot';
// import SourcesSlack from './SourcesSlack';

export default function BadgeAvatars({ appSettings }: { appSettings: AppSettings }) {
  const serviceRefs = React.useRef<{ [key: string]: HTMLDivElement }>({});

  const flags = useFlags([
    'airtable',
    'files',
    'docubot',
    'confluence',
    'documents',
    'zoom',
    'youtube'
  ]);

  const enabledServices: AppService[] | undefined = appSettings?.services?.filter((service) => {
    const isServiceEnabledInFlags = (flags?.[service.name] as any)?.enabled;
    return isServiceEnabledInFlags || service.enabled;
  });

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
              {service.imageURL ? (
                <Image
                  style={{ background: 'white', padding: '8px' }}
                  src={service.imageURL}
                  alt={`${service.name} logo`}
                  width={40}
                  height={40}
                />
              ) : (
                service.name[0]?.toUpperCase()
              )}
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
              {selectedService.name === 'slack' ? (
                <JourneySetting
                  app={selectedService.name}
                  appSettings={appSettings}
                  filters={filters}
                  updateFilter={updateFilter}
                />
              ) : null}

              {flags?.docubot?.enabled && selectedService.name === 'docubot' ? (
                <JourneySetting
                  app={selectedService.name}
                  appSettings={appSettings}
                  filters={filters}
                  updateFilter={updateFilter}
                />
              ) : null}

              {flags?.airtable?.enabled && selectedService.name === 'airtable' ? (
                <JourneySetting
                  app={selectedService.name}
                  appSettings={appSettings}
                  filters={filters}
                  updateFilter={updateFilter}
                />
              ) : null}

              {serviceOpen === 'confluence' ? (
                <JourneySetting
                  app={selectedService.name}
                  appSettings={appSettings}
                  filters={filters}
                  updateFilter={updateFilter}
                />
              ) : null}

              {serviceOpen === 'web' ? <SourcesWeb /> : null}

              {serviceOpen === 'jira' ? (
                <JourneySetting
                  app={selectedService.name}
                  appSettings={appSettings}
                  filters={filters}
                  updateFilter={updateFilter}
                />
              ) : null}
              {flags?.docubot?.enabled && selectedService.name === 'docubot' ? (
                <>
                  <AutocompleteSelect
                    label="Repository"
                    options={
                      appSettings?.docubot?.repos?.filter((s) => s.enabled)?.map((s) => s.id) || []
                    }
                    value={filters?.datasources?.docubot?.repo || []}
                    onChange={(value) =>
                      updateFilter({ datasources: { docubot: { repo: value as string[] } } })
                    }
                  />
                </>
              ) : null}
              {serviceOpen === 'files' ? <SourcesFiles /> : null}
              {flags?.documents?.enabled && selectedService?.name === 'documents' ? (
                <>
                  <AutocompleteSelect
                    label="Documents"
                    options={
                      appSettings?.documents?.docs?.filter((s) => s.enabled)?.map((s) => s.id) || []
                    }
                    value={filters?.datasources?.document?.name || []}
                    onChange={(value) =>
                      updateFilter({ datasources: { document: { name: value } } })
                    }
                  />
                </>
              ) : null}
              {flags?.zoom?.enabled && selectedService?.name === 'zoom' ? (
                <>
                  <AutocompleteSelect
                    label="Meetings"
                    options={
                      appSettings?.zoom?.meetings?.filter((s) => s.enabled)?.map((s) => s.id) || []
                    }
                    value={filters?.datasources?.zoom?.name || []}
                    onChange={(value: string[]) =>
                      updateFilter({ datasources: { zoom: { name: value } } })
                    }
                  />
                </>
              ) : null}
              {flags?.youtube?.enabled && selectedService?.name === 'youtube' ? (
                <>
                  <AutocompleteSelect
                    label="Videos"
                    options={
                      appSettings?.youtube?.video?.filter((s) => s.enabled)?.map((s) => s.id) || []
                    }
                    value={filters?.datasources?.youtube?.name || []}
                    onChange={(value: string[]) =>
                      updateFilter({ datasources: { youtube: { name: value } } })
                    }
                  />
                </>
              ) : null}
              {flags?.airtable?.enabled && selectedService.name === 'airtable' ? (
                <>
                  <AutocompleteSelect
                    label="Table"
                    options={
                      appSettings?.airtable?.tables?.filter((s) => s.enabled)?.map((s) => s.id) ||
                      []
                    }
                    value={filters?.datasources?.airtable?.table || []}
                    onChange={(value: string[]) =>
                      updateFilter({ datasources: { airtable: { table: value } } })
                    }
                  />
                </>
              ) : null}
            </Box>
          </Box>
        </Popover>
      ) : null}
    </>
  );
}
