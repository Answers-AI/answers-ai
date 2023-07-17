'use client';
import React from 'react';
import NextLink from 'next/link';
import { Journey } from 'types';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import JourneyCard from '../JourneyLayout/JourneyCard';
import AddIcon from '@mui/icons-material/EditRoad';
import MessageIcon from '@mui/icons-material/Message';
import { Button } from '@mui/material';

const HomepageClient = ({ journeys }: { journeys: Journey[] }) => {
  return (
    <Box p={8}>
      <Image
        src={'/logos/answerai-logo-600-white-teal-orange.png'}
        alt={'AnswerAI Logo'}
        width={400}
        height={80}
      />
      <Divider sx={{ my: 2 }} />
      <Box my={4}>
        <Typography variant="h5" component="h2">
          Start Fresh...
        </Typography>
        <Box
          mt={2}
          sx={{
            width: '100%',
            height: 80,
            gap: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, min-content))',
            gridAutoFlow: 'dense',
            transition: '.3s'
          }}>
          <Button
            component={NextLink}
            data-cy="new-journey-button"
            href="/journey/new"
            variant="contained"
            endIcon={<AddIcon />}>
            <strong>New Journey</strong>
          </Button>
          <Button
            color="primary"
            component={NextLink}
            data-cy="quick-chat-button"
            href="/chat"
            variant="outlined"
            endIcon={<MessageIcon fontSize="large" />}>
            <strong>Quick chat</strong>
          </Button>
          {/* <Box>
            <Card>
              <NextLink href="/journey/new">
                <CardActionArea>
                  <CardHeader
                    titleTypographyProps={{ variant: 'h6' }}
                    avatar={<AddIcon />}
                    title="New Journey"></CardHeader>
                </CardActionArea>
              </NextLink>
            </Card>
          </Box> */}
          {/* <Box>
            <Card>
              <NextLink href="/chat">
                <CardActionArea>
                  <CardHeader
                    titleTypographyProps={{ variant: 'h6' }}
                    avatar={<MessageIcon />}
                    title="Quick Chat"></CardHeader>
                </CardActionArea>
              </NextLink>
            </Card>
          </Box> */}
        </Box>
      </Box>
      <Box my={4}>
        <Typography variant="h5" component="h2">
          Or continue ...
        </Typography>
        <Box
          mt={2}
          sx={{
            width: '100%',
            gap: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gridAutoFlow: 'dense',
            transition: '.3s'
          }}>
          {journeys &&
            !!journeys.length &&
            journeys
              ?.filter((journey) => !!journey?.goal)
              ?.map((journey, idx) => (
                <Box key={journey.id}>
                  <JourneyCard journey={journey as any} />
                </Box>
              ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomepageClient;
