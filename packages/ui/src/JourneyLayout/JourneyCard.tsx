import React from 'react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

import MessageIcon from '@mui/icons-material/Message';

import { Journey } from 'types';

interface JourneyCardProps extends Journey {
  _count: { chats: number };
}

interface Props {
  journey: JourneyCardProps;
}

const JourneyCard = ({ journey }: Props) => {
  const { title, updatedAt, id, goal, _count } = journey;

  return (
    <Card
      component={motion.div}
      layoutId={id}
      sx={{
        flex: 1,
        height: '100%',
        display: 'flex',
        position: 'relative',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        flexDirection: 'column'
      }}>
      {/* <NextLink> */}
      <CardActionArea
        component={NextLink}
        href={`/journey/${journey.id}`}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardHeader
          // avatar={<AddRoadIcon fontSize="small" />}
          sx={{ flex: 1, display: 'flex', width: '100%' }}
          title={
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textTransform: 'capitalize',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: '2'
              }}>
              {title ?? goal}
            </Typography>
          }
          titleTypographyProps={{ variant: 'body1' }}></CardHeader>

        {/* {goal ? (
            <CardContent>
              <Typography variant="body1">{`Goal: ${goal}`}</Typography>{' '}
            </CardContent>
          ) : null} */}

        <CardActions sx={{ justifyContent: 'space-between', width: '100%' }}>
          {/* {updatedAt ? (
            <Typography variant="body2" sx={{ marginLeft: 'auto' }}>{`Updated ${formatDateSince(
              updatedAt
            )}`}</Typography>
          ) : null} */}
          <div></div>
          <Button disabled startIcon={<MessageIcon sx={{ fontSize: 16 }} />}>
            {_count.chats}
          </Button>
        </CardActions>
      </CardActionArea>
      {/* </NextLink> */}
    </Card>
  );
};

export default JourneyCard;
