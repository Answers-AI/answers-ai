'use client';
import React, { Suspense } from 'react';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import {
  AppBar,
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { AppService, AppSettings } from 'types';
import { MessageCard } from './Message';
import { useAnswers } from './AnswersContext';

import { ChatInput } from './ChatInput';
import ShareIcon from '@mui/icons-material/IosShare';
import { usePathname, useSearchParams } from 'next/navigation';
import DrawerFilters from './DrawerFilters/DrawerFilters';

import FilterIcon from '@mui/icons-material/FilterList';
import ArrowBackIcon from '@mui/icons-material/ArrowForward';
import { Filters } from './Filters';

export const ChatDetail = ({
  appSettings,
  prompts
}: {
  appSettings: AppSettings;
  prompts?: any;
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const {
    error,
    chat,
    journey,
    messages: clientMessages,
    isLoading,
    regenerateAnswer,
    showFilters,
    filters,

    setShowFilters
  } = useAnswers();
  const messages = clientMessages || chat?.messages;
  const searchParams = useSearchParams();

  const filteredServices = Object.keys((filters?.datasources as Object) ?? {});
  const services: { [key: string]: AppService } =
    appSettings?.services
      ?.filter((service) => filteredServices.includes(service.id))
      ?.reduce((acc, service) => ({ ...acc, [service.id]: service }), {}) ?? {};

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'space-between',
            borderLeft: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
          <AppBar
            position="static"
            sx={{ paddingLeft: 4, borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}
            color={'transparent'}
            elevation={0}>
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {chat ? <Typography variant="body1">{chat?.title ?? chat.id}</Typography> : null}
                {journey ? (
                  <Typography variant="body2">{journey?.goal ?? journey?.title}</Typography>
                ) : null}
              </Box>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                {/* <SourcesToolbar appSettings={appSettings} /> */}
                {chat ? (
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="share"
                    component={NextLink}
                    href={`?modal=share`}>
                    <ShareIcon />
                  </IconButton>
                ) : null}

                {!showFilters ? (
                  <Tooltip
                    PopperProps={{ placement: 'top-end' }}
                    title={!Object.keys(services)?.length ? null : <Filters filters={filters} />}>
                    <Button
                      size="large"
                      color="inherit"
                      aria-label="manage sources"
                      onClick={() => setShowFilters(!showFilters)}
                      sx={{ display: 'flex', gap: 1 }}>
                      {!Object.keys(services)?.length ? 'Select sources' : null}
                      <AvatarGroup
                        max={4}
                        sx={{ '.MuiAvatar-root': { ml: -2, width: 32, height: 32 } }}>
                        {(Object.keys(services)?.length
                          ? Object.values(services)
                          : appSettings.services
                        )?.map((service) => (
                          <Avatar variant="source" src={service.imageURL} />
                        ))}
                      </AvatarGroup>
                    </Button>
                  </Tooltip>
                ) : (
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="manage sources"
                    edge="end"
                    onClick={() => setShowFilters(!showFilters)}
                    sx={{}}>
                    {!showFilters ? <FilterIcon /> : <ArrowBackIcon />}
                  </IconButton>
                )}
                {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                component={NextLink}
                href={`${pathname}`}>
                <MenuIcon />
              </IconButton> */}
              </Box>
            </Toolbar>
          </AppBar>
          <Box ref={scrollRef} sx={{ height: '100%', overflow: 'auto', px: 2, py: 3 }}>
            <Suspense fallback={<div>Loading...</div>}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',

                  gap: 2
                }}>
                {messages?.map((message, index) => (
                  <MessageCard {...message} key={`message_${index}`} />
                ))}
                {error ? (
                  <>
                    <MessageCard
                      // user={user}
                      role="assistant"
                      content={`There was an error completing your request, please try again`}
                      error={error}
                    />
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Button
                        onClick={() => regenerateAnswer()}
                        variant="contained"
                        color="primary"
                        sx={{ margin: 'auto' }}>
                        Retry
                      </Button>
                    </Box>
                  </>
                ) : null}
                {isLoading ? (
                  <MessageCard
                    //  user={user}
                    role="loading"
                    content={'...'}
                  />
                ) : null}
                {!messages?.length ? (
                  <MessageCard
                    // user={user}
                    role="assistant"
                    content={
                      'Welcome! Try asking me something below, or select your data sources on the top right!'
                    }
                  />
                ) : null}
                {messages?.length && !isLoading && !error ? (
                  <Box sx={{ py: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={() => regenerateAnswer()} variant="outlined" color="primary">
                      Regenerate answer
                    </Button>
                  </Box>
                ) : null}
              </Box>
            </Suspense>
          </Box>
        </Box>
        <ChatInput />
      </div>
      <DrawerFilters appSettings={appSettings} />
    </>
  );
};
