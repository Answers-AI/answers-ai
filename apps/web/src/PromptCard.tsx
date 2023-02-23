import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface PromptCardProps {
  title?: string;
  prompt: string;
  actor?: string;
  likes?: number;
  views?: number;
  usages?: number;
  onClick: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({
  title,
  prompt,
  actor,
  likes,
  views,
  usages,
  onClick
}) => {
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
      }}
      onClick={onClick}>
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
          {title || prompt ? (
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {title || prompt}
            </Typography>
          ) : null}
        </CardContent>
        <CardActions>
          {usages ? (
            <Button
              size="small"
              color="primary"
              startIcon={<VisibilityIcon sx={{ fontSize: 12 }} />}>
              {usages}
            </Button>
          ) : null}
          {likes ? (
            <Button size="small" color="primary" startIcon={<FavoriteIcon sx={{ fontSize: 12 }} />}>
              {likes}
            </Button>
          ) : null}
        </CardActions>
      </Box>
    </Card>
  );
};

export default PromptCard;
