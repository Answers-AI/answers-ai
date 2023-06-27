'use client';
import React from 'react';
import { useFlags } from 'flagsmith/react';
import { Box, ClickAwayListener } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { AppSettings, AppService, AnswersFilters } from 'types';
import { useAnswers } from '../AnswersContext';
import JourneySourceCard from './JourneySourceCard';

export const JourneyAppsDrawer = ({
  appSettings,
  activeApp
}: {
  appSettings: AppSettings;
  activeApp?: string;
}) => {
  const serviceRefs = React.useRef<{ [key: string]: HTMLDivElement }>({});

  const flags = useFlags(['airtable', 'codebase', 'confluence']);

  const enabledServices: AppService[] | undefined = appSettings?.services?.filter((service) => {
    const isServiceEnabledInFlags = (flags?.[service.name] as any)?.enabled;
    return isServiceEnabledInFlags || service.enabled;
  });

  const [serviceOpen, setServiceOpen] = React.useState<string>('');
  const { filters, updateFilter } = useAnswers();
  const selectedService = enabledServices?.find((service) => service.name === serviceOpen);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          gap: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gridAutoFlow: 'dense',
          transition: '.3s'
        }}>
        {appSettings?.services
          ?.filter((s) => s.enabled || (flags?.[s.name] as any)?.enabled)
          ?.map((service) => (
            <JourneySourceCard
              appSettings={appSettings}
              filters={filters}
              updateFilter={updateFilter}
              key={service?.id}
              {...service}
              // expanded={selectedService?.name === service.name}
              expanded
              // onClick={() => setServiceOpen(service.name)}
            />
          ))}
      </Box>
      <AnimatePresence>
        {selectedService && serviceOpen !== '' ? (
          <Box
            // open={!!expanded}
            // onClose={() => setExpanded(null)}
            component={motion.div}
            key="modal"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              placeContent: 'center',
              placeItems: 'center',
              zIndex: 1,
              height: '100%',
              width: '100%',
              pointerEvents: 'none',
              background: 'rgba(0,0,0,0.4)'
            }}>
            <ClickAwayListener onClickAway={() => setServiceOpen('')}>
              <Box
                component={motion.div}
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  placeContent: 'center',
                  placeItems: 'center',
                  width: '100%',
                  maxWidth: '900px',
                  willChange: 'transform',
                  pointerEvents: 'all'
                }}>
                <JourneySourceCard
                  appSettings={appSettings}
                  filters={filters}
                  updateFilter={updateFilter}
                  enabled={true}
                  {...selectedService}
                  id={selectedService.name}
                  expanded={true}
                />
              </Box>
            </ClickAwayListener>
          </Box>
        ) : null}
      </AnimatePresence>
    </>
  );
};
