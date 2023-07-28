'use client';
import React, { Suspense, useRef } from 'react';

import NextLink from 'next/link';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ArrowBackIcon from '@mui/icons-material/ArrowForward';
import ShareIcon from '@mui/icons-material/IosShare';

import { MessageCard } from './Message';
import { useAnswers } from './AnswersContext';
import ChatInput from './ChatInput';
import DrawerFilters from './DrawerFilters/DrawerFilters';
import { Filters } from './Filters';

import type { AppService, AppSettings, Sidekick } from 'types';

export const ChatDetail = ({
  appSettings,
  prompts,
  sidekicks = []
}: {
  appSettings: AppSettings;
  prompts?: any;
  sidekicks?: Sidekick[];
}) => {
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = clientMessages || chat?.messages;

  const filteredServices = Object.keys((filters?.datasources as Object) ?? {});
  const services: { [key: string]: AppService } =
    appSettings?.services
      ?.filter((service) => filteredServices.includes(service.id))
      ?.reduce((acc, service) => ({ ...acc, [service.id]: service }), {}) ?? {};

  return (
    <>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}>
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
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  p: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textTransform: 'capitalize',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '1'
                  }
                }}>
                {chat ? <Typography variant="body1">{chat?.title ?? chat.id}</Typography> : null}

                {journey ? (
                  <Typography variant="body2">{journey?.goal ?? journey?.title}</Typography>
                ) : null}
              </Box>

              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
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
                      sx={{ display: 'flex', minWidth: 0, borderRadius: 20 }}>
                      {!Object.keys(services)?.length ? 'Select sources' : null}

                      <AvatarGroup
                        max={4}
                        sx={{ '.MuiAvatar-root': { ml: -2, width: 28, height: 28 } }}>
                        {(Object.keys(services)?.length
                          ? Object.values(services)
                          : appSettings.services
                        )?.map((service) => (
                          <Avatar key={service.id} variant="source" src={service.imageURL} />
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
                    <ArrowBackIcon />
                  </IconButton>
                )}
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
                      id="error"
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

                {isLoading ? <MessageCard role="loading" content={'...'} /> : null}

                {!messages?.length ? (
                  <MessageCard
                    id="placeholder"
                    role="assistant"
                    content={
                      'Welcome! Try asking me something below, or select your data sources on the top right!'
                    }
                  />
                ) : null}

                {!isLoading && !error && messages?.length ? (
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

        <ChatInput sidekicks={sidekicks} />
      </Box>

      <Suspense fallback={<div>Loading...</div>}>
        <DrawerFilters appSettings={appSettings} />
      </Suspense>
    </>
  );
};
