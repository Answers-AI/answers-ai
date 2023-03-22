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
  Chip,
  IconButton,
  CardHeader
} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import Delete from '@mui/icons-material/Delete';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuButton from './MenuButton';
import { useAnswers } from './AnswersContext';
const ChatCard: React.FC<ChatCardProps> = ({ id, prompt, filters, messages }) => {
  const { deleteChat } = useAnswers();
  const title = prompt?.content;
  return (
    <Card
      sx={{
        'display': 'flex',
        'position': 'relative',
        // 'padding': 2,
        // 'height': '100%',
        'cursor': 'pointer',
        'transition': 'all 0.2s ease-in-out',
        '&:hover': {
          // backgroundColor: '#000000'
        }
      }}>
      <CardHeader
        sx={{ position: 'absolute', top: 0, right: 0, zIndex: 999999 }}
        action={
          <MenuButton
            aria-label="menu"
            actions={[{ text: 'Delete Chat', onClick: () => deleteChat(id), icon: <Delete /> }]}>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </MenuButton>
        }
      />

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
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                sx={{
                  'overflow': 'hidden',
                  'text-overflow': 'elipsis',
                  'display': '-webkit-box',
                  '-webkit-line-clamp': '3',
                  '-webkit-box-orient': 'vertical'
                }}>
                {title}
              </Typography>
            ) : null}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {Object.keys(filters)?.map((filter) =>
                filters[filter]?.length ? (
                  <Chip key={`${id}_${filter}`} label={filters[filter]?.join(', ')} size="small" />
                ) : null
              )}
            </Box>
          </CardContent>
          {filters ? (
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {messages ? (
                <Button size="small" disabled startIcon={<MessageIcon sx={{ fontSize: 16 }} />}>
                  {messages?.length}
                </Button>
              ) : null}
            </CardActions>
          ) : null}
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ChatCard;
