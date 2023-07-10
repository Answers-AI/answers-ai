'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import IntegrationCard from './IntegrationCard';

import { AppSettings } from 'types';

export const AppsDrawer = ({
  appSettings,
  activeApp
}: {
  appSettings: AppSettings;
  activeApp?: string;
}) => {
  // const [expanded, setExpanded] = React.useState<any>({
  //   // ...appSettings?.services?.reduce((accum, item, idx) => ({ ...accum, [idx]: item.enabled }), {})
  // });
  const router = useRouter();
  const selected = appSettings?.services?.find((item) => item.id === activeApp);

  // console.log('Expanded', expanded);
  return (
    <>
      <Box
        sx={{
          width: '100%',
          gap: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gridAutoFlow: 'dense',
          transition: '.3s'
          // ...Object.keys(expanded).reduce(
          //   (accum, key) => ({
          //     ...accum,
          //     [`> *:nth-child(${parseInt(key) + 1})`]: expanded[key]
          //       ? { transition: '.3s', gridColumn: 'span 2' }
          //       : {}
          //   }),
          //   {}
          // )
        }}>
        {appSettings?.services?.map((item, idx) => (
          <IntegrationCard
            appSettings={appSettings}
            key={item?.id}
            {...item}
            expanded={false}
            onClick={() => router.push(`/settings/integrations/${item?.id}`)}
          />
        ))}
      </Box>
      <AnimatePresence>
        {!!selected ? (
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
              // transform: 'translate(-50%, -50%)',
              zIndex: 1,
              height: '100%',
              width: '100%',
              // display: 'flex',
              // justifyContent: 'center',
              // alignItems: 'center',
              pointerEvents: 'none',
              background: 'rgba(0,0,0,0.4)'
            }}>
            <ClickAwayListener onClickAway={() => router.push('/settings/integrations')}>
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
                <IntegrationCard {...selected} expanded appSettings={appSettings} editable />
              </Box>
            </ClickAwayListener>
          </Box>
        ) : null}
      </AnimatePresence>
    </>
  );
};
