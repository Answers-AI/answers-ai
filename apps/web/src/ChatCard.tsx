import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardActionArea,
  Chip
} from '@mui/material';
import { Chat, Prompt } from 'types';

interface ChatCardProps extends Chat {
  filters: any;
  // prompt: Prompt;
  // title?: string;
  // content: string;
  // actor?: string;
  // likes?: number;
  // views?: number;
  // usages?: number;
  // onClick: () => void;
}

const ChatCard: React.FC<ChatCardProps> = ({ id, prompt, filters }) => {
  const title = prompt?.content;
  return (
    <Card
      sx={{
        'display': 'flex',

        // 'padding': 2,
        // 'height': '100%',
        'cursor': 'pointer',
        'transition': 'all 0.2s ease-in-out',
        '&:hover': {
          // backgroundColor: '#000000'
        }
      }}>
      <CardActionArea component={NextLink} sx={{ minHeight: '100%' }} href={`/chat/${id}`}>
        <Box
          sx={{
            width: '100%',
            minHeight: '100%',
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
          <CardContent
            sx={{
              width: '100%',
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 1
            }}>
            {title ? (
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {title}
              </Typography>
            ) : null}
            {filters ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {Object.keys(filters)?.map((filter) =>
                  filters[filter]?.length ? (
                    <Chip key={`${filter}`} label={filters[filter]?.join(', ')} />
                  ) : null
                )}
              </Box>
            ) : null}
          </CardContent>
          <CardActions>
            {/* {usages ? (
            <Button size="small" disabled startIcon={<VisibilityIcon sx={{ fontSize: 12 }} />}>
              {usages}
            </Button>
          ) : null}
          {likes ? (
            <Button size="small" color="primary" startIcon={<FavoriteIcon sx={{ fontSize: 12 }} />}>
              {likes}
            </Button>
          ) : null} */}
          </CardActions>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ChatCard;
