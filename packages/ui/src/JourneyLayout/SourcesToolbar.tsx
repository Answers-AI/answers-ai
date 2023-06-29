import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { AppSettings, AppService } from 'types';

import { AvatarGroup, Box, Popover, Typography } from '@mui/material';
import { useAnswers } from '../AnswersContext';
import { useFlags } from 'flagsmith/react';
import Image from 'next/image';
import JourneySetting from './JourneySetting';

export default function BadgeAvatars({ appSettings }: { appSettings: AppSettings }) {
  const serviceRefs = React.useRef<{ [key: string]: HTMLDivElement }>({});

  const flags = useFlags([
    'airtable',
    'files',
    'codebase',
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
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'column'
              }}>
              {selectedService.name ? (
                <JourneySetting
                  app={selectedService.name}
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
