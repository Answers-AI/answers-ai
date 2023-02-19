import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import error from 'next/error';

interface PromptCardProps {
  title?: string;
  prompt: string;
  actor?: string;
  likes?: number;
  views?: number;
  onClick: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ title, prompt, actor, likes, views, onClick }) => {
  return (
    <Card
      sx={{
        'display': 'flex',
        'padding': 2,
        'cursor': 'pointer',
        'transition': 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: '#000000'
        }
      }}
      onClick={onClick}>
      <CardContent
        sx={{ py: 0, px: 2, width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {title || prompt ? (
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {title || prompt}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default PromptCard;
