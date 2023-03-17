import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardActionArea
} from '@mui/material';
import { Chat, Prompt } from 'types';

interface ChatCardProps extends Chat {
  // prompt: Prompt;
  // title?: string;
  // content: string;
  // actor?: string;
  // likes?: number;
  // views?: number;
  // usages?: number;
  // onClick: () => void;
}

const ChatCard: React.FC<ChatCardProps> = ({ id, prompt }) => {
  const title = prompt?.content;
  return (
    <Card
      sx={{
        // 'display': 'flex',
        // 'padding': 2,
        // 'height': '100%',
        'cursor': 'pointer',
        'transition': 'all 0.2s ease-in-out',
        '&:hover': {
          // backgroundColor: '#000000'
        }
      }}>
      <CardActionArea href={`/chats/${id}`}>
        <Box
          sx={{
            width: '100%',
            flex: '1',
            display: 'flex'
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
