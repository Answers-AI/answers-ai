'use client';
import React from 'react';
import { useFlags } from 'flagsmith/react';
import { AnimatePresence, motion } from 'framer-motion';

import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { useAnswers } from '../AnswersContext';
import JourneySourceCard from './JourneySourceCard';

import { AppSettings, AppService } from 'types';

export const JourneyAppsDrawer = ({
  appSettings,
  activeApp
}: {
  appSettings: AppSettings;
  activeApp?: string;
}) => {
  const flags = useFlags(appSettings?.services?.map((s) => s.name) ?? []);

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
              expanded
            />
          ))}
      </Box>
      <AnimatePresence>
        {selectedService && serviceOpen !== '' ? (
          <Box
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
