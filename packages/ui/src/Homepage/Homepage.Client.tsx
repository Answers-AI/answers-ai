'use client';
import React from 'react';
import NextLink from 'next/link';
import { Journey } from 'types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import JourneyCard from '../JourneyLayout/JourneyCard';
import AddIcon from '@mui/icons-material/Add';
import MessageIcon from '@mui/icons-material/QueryBuilder';

const HomepageClient = ({ journeys }: { journeys: Journey[] }) => {
  return (
    <Box p={8}>
      <Typography variant="h2" component="h1">
        Welcome to Answer AI
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box my={4}>
        <Typography variant="h5" component="h2">
          Start Fresh...
        </Typography>
        <Box
          mt={2}
          sx={{
            width: '100%',
            gap: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, min-content))',
            gridAutoFlow: 'dense',
            transition: '.3s'
          }}>
          <Box>
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
          </Box>
          <Box>
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
          </Box>
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
            journeys?.map((journey, idx) => (
              <Box key={journey.id}>
                {' '}
                <JourneyCard journey={journey} />
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomepageClient;
