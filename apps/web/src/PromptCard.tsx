import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardActionArea
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface PromptCardProps {
  title?: string;
  content: string;
  actor?: string;
  likes?: number;
  dislikes?: number;
  views?: number;
  usages?: number;
  onClick: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({
  title,

  content,
  actor,
  likes,
  dislikes,
  views,
  usages,
  onClick
}) => {
  const handleLike = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
  };
  return (
    <Card
      sx={{
        display: 'flex',

        alignItems: 'space-between',
        justifyContent: 'space-between',
        flexDirection: 'column'
      }}>
      <Box
        sx={{
          width: '100%',
          // height: '100%',
          flex: '1',
          display: 'flex'
          // justifyContent: 'space-between',
          // flexDirection: 'column'
        }}>
        <CardActionArea
          sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          onClick={onClick}>
          <CardContent
            sx={{
              width: '100%',

              gap: 1
            }}>
            {title || content ? (
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {title || content}
              </Typography>
            ) : null}
          </CardContent>
        </CardActionArea>
      </Box>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button
            color="secondary"
            sx={{}}
            size="small"
            startIcon={<ThumbUpIcon sx={{ fontSize: 12 }} />}
            onClick={handleLike}>
            {likes}
          </Button>
          <Button
            size="small"
            color="secondary"
            startIcon={<ThumbDownIcon sx={{ fontSize: 12 }} />}
            onClick={handleLike}>
            {dislikes}
          </Button>
        </Box>
        {usages ? (
          <Button size="small" disabled startIcon={<VisibilityIcon sx={{ fontSize: 12 }} />}>
            {usages}
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default PromptCard;
