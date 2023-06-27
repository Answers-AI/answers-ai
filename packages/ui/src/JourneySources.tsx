import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { AppSettings, ConfluenceSpace, AppService, Flags } from 'types';

import { AvatarGroup, Box, Popover, Typography } from '@mui/material';
import AutocompleteSelect from './AutocompleteSelect';
import { useAnswers } from './AnswersContext';
import { useFlags } from 'flagsmith/react';
import Image from 'next/image';
import SourcesWeb from './SourcesWeb';
import SourcesJira from './JourneyLayout/SourcesJira';
import SourcesConfluence from './JourneyLayout/SourcesConfluence';
import SourcesAirtable from './JourneyLayout/SourcesAirtable';
import SourcesCodebase from './SourcesCodebase';
import SourcesSlack from './JourneyLayout/SourcesSlack';

export default function JourneySources({ appSettings }: { appSettings: AppSettings }) {
  const serviceRefs = React.useRef<{ [key: string]: HTMLDivElement }>({});

  const flags = useFlags(['airtable', 'docubot']);

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
                <SourcesSlack
                  appSettings={appSettings}
                  filters={filters}
                  updateFilter={updateFilter}
                />
              ) : null}

              {flags?.docubot?.enabled && selectedService.name === 'codebase' ? (
                <SourcesCodebase
                  appSettings={appSettings}
                  filters={filters}
                  updateFilter={updateFilter}
                />
              ) : null}

              {flags?.airtable?.enabled && selectedService.name === 'airtable' ? (
                <SourcesAirtable
                  appSettings={appSettings}
                  filters={filters}
                  updateFilter={updateFilter}
                />
              ) : null}

              {serviceOpen === 'confluence' ? (
                <SourcesConfluence
                  appSettings={appSettings}
                  filters={filters}
                  updateFilter={updateFilter}
                />
              ) : null}

              {serviceOpen === 'web' ? <SourcesWeb /> : null}

              {serviceOpen === 'jira' ? (
                <SourcesJira
                  appSettings={appSettings}
                  filters={filters}
                  updateFilter={updateFilter}
                />
              ) : null}
            </Box>
          </Box>
        </Popover>
      ) : null}
    </>
  );
}
