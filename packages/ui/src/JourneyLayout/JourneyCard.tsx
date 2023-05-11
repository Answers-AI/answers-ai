import React from 'react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import WorkIcon from '@mui/icons-material/Work';
import formatDateSince from '@utils/formatDateSince';

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
        display: 'flex',
        position: 'relative',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        flexDirection: 'column'
      }}>
      <NextLink href={`/journey/${journey.id}`}>
        <CardActionArea>
          <CardHeader
            avatar={<WorkIcon fontSize="small" />}
            titleTypographyProps={{ variant: 'body1' }}
            title={title}></CardHeader>

          {goal ? (
            <CardContent>
              <Typography variant="body1">{`Goal: ${goal}`}</Typography>{' '}
            </CardContent>
          ) : null}
        </CardActionArea>

        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Typography variant="body2">{`${_count.chats} Chats`}</Typography>
          {updatedAt ? (
            <Typography variant="body2" sx={{ marginLeft: 'auto' }}>{`Updated ${formatDateSince(
              updatedAt
            )}`}</Typography>
          ) : null}
        </CardActions>
      </NextLink>
    </Card>
  );
};

export default JourneyCard;
