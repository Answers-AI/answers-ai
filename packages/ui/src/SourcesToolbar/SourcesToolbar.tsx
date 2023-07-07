import * as React from 'react';
import Avatar from '@mui/material/Avatar';

import NextLink from 'next/link';
import { AppSettings, AppService } from 'types';
import {
  AvatarGroup,
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAnswers } from '../AnswersContext';
import { useFlags } from 'flagsmith/react';
import Image from 'next/image';
import JourneySetting from '@ui/JourneySetting';
import { ExpandLess, ExpandMore, Add } from '@mui/icons-material';
import { Filters } from '@ui/Filters';
import { Accordion, AccordionDetails, AccordionSummary } from '@ui/Accordion';

export default function SourcesToolbar({ appSettings }: { appSettings: AppSettings }) {
  const flags = useFlags(appSettings?.services?.map((s) => s.name) ?? []);

  const enabledServices: AppService[] | undefined = React.useMemo(
    () =>
      appSettings?.services?.filter((service) => {
        return (flags?.[service.name] as any)?.enabled;
      }) ?? [],
    [appSettings?.services, flags]
  );

  const { filters, showFilters, updateFilter } = useAnswers();
  const [opened, setOpened] = React.useState<{ [key: string]: any }>(
    appSettings?.services?.reduce(
      (acc, service) => ({
        ...acc,
        [service.id!]: false
      }),
      {}
    ) ?? {}
  );

  React.useEffect(() => {
    if (showFilters) {
      setOpened(
        enabledServices?.reduce(
          (acc, service) => ({
            ...acc,
            [service.id!]: !!(filters?.datasources as any)?.[service.id]
          }),
          {}
        )
      );
    }
  }, [showFilters, enabledServices, filters]);

  const handleOpenToggle = (serviceId: string) =>
    setOpened((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
      {Object.keys(filters)?.length ? (
        <>
          <Accordion
            defaultExpanded
            sx={{
              '&.MuiPaper-root': {
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 0,
                py: 1
              }
            }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: '64px!important' }}>
              <Typography variant="overline">Selected sources</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '8px!important', px: 1 }}>
              <Filters filters={filters} />
            </AccordionDetails>
          </Accordion>
        </>
      ) : null}
      <List disablePadding sx={{ gap: 1, py: 1 }}>
        {enabledServices?.map((service, idx) => (
          <React.Fragment key={service.id}>
            <ListItem
              key={service.id}
              disablePadding
              sx={{
                'gap': 1,
                'flexDirection': 'column',
                '.MuiIconButton-root': { opacity: 1, transition: '.1s', overflow: 'hidden' },
                '&:not(:hover)': {
                  '.MuiIconButton-root': {
                    opacity: 0,
                    px: 0,
                    width: 0
                  }
                }
              }}>
              <ListItemButton
                onClick={() => handleOpenToggle(service.id)}
                // component={NextLink}
                sx={{ width: '100%', paddingRight: 1 }}>
                <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                  <Avatar variant="source" src={service.imageURL} sx={{ width: 24, height: 24 }} />
                </ListItemIcon>
                <ListItemText primary={service.name} sx={{ textTransform: 'capitalize' }} />

                {opened[service.id] ? <ExpandLess /> : <ExpandMore />}
                {/* {journey?.chats?.length ? (
                    <IconButton onClick={handleExpandJourney(idx)}>
                      {opened[idx] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  ) : null} */}
                {/* <IconButton onClick={() => handleAddChat({ journey })}>
                    <Add />
                  </IconButton> */}
              </ListItemButton>
              <Collapse in={opened[service.id]} sx={{ width: '100%' }}>
                <JourneySetting
                  app={service.name}
                  appSettings={appSettings}
                  filters={filters}
                  updateFilter={updateFilter}
                />
              </Collapse>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
