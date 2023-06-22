'use client';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

export const NotInvitedPage = ({ session }: { session: Session | undefined }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
        <Typography variant="h4">You are almost in!</Typography>
        <Typography variant="h5">Answer AI is currently in closed beta.</Typography>
        <Typography variant="h6">Check your emai for a confirmation soon!</Typography>

        <Button variant="outlined" fullWidth onClick={() => signOut()}>
          Change account
        </Button>
      </Box>
    </Box>
  );
};
