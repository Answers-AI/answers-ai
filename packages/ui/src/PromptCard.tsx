import React from 'react';

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardActionArea,
  IconButton,
  CardHeader
} from '@mui/material';

import MenuButton from './MenuButton';
import { useAnswers } from './AnswersContext';
import { Prompt } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEye, faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
interface PromptCardProps extends Prompt {
  onClick: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ id, title, content, usages, onClick }) => {
  const { deletePrompt } = useAnswers();
  const handleLike = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
  };
  return (
    <Card
      sx={{
        display: 'flex',

        position: 'relative',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        flexDirection: 'column'
      }}>
      <CardHeader
        sx={{ position: 'absolute', top: 0, right: 0, zIndex: 999999 }}
        action={
          <MenuButton
            aria-label="menu"
            actions={[
              {
                text: 'Delete Prompt',
                onClick: () => deletePrompt(id),
                icon: <FontAwesomeIcon icon={faTrashCan} />
              }
            ]}>
            <IconButton>
              <FontAwesomeIcon icon={faEllipsisV} />
            </IconButton>
          </MenuButton>
        }
      />
      <Box
        sx={{
          width: '100%',
          flex: '1',
          display: 'flex'
        }}>
        <CardActionArea
          sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingRight: 4,
            paddingBottom: 4
          }}
          onClick={onClick}>
          <CardContent
            sx={{
              width: '100%',

              gap: 1
            }}>
            {title || content ? (
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'elipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical'
                }}>
                {title || content}
              </Typography>
            ) : null}
          </CardContent>
        </CardActionArea>
      </Box>
      <CardActions
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          position: 'absolute',
          left: 0,
          bottom: 0
        }}>
        {usages ? (
          <Button
            size="small"
            disabled
            startIcon={<FontAwesomeIcon icon={faEye} style={{ fontSize: 16 }} />}>
            {usages}
          </Button>
        ) : null}
        <Box>
          <IconButton color="secondary" sx={{}} size="small" onClick={handleLike}>
            <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton size="small" color="secondary" onClick={handleLike}>
            <FontAwesomeIcon icon={faThumbsDown} style={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PromptCard;
