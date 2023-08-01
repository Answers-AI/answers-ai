'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { Document } from 'types';
import { CircularProgress, Typography } from '@mui/material';
import SyncProblem from '@mui/icons-material/SyncProblem';
import axios from 'axios';

const POLLING_INTERVAL = 3000;

export const FilterStatus = ({ document }: { document: Document }) => {
  const [status, setStatus] = useState(document.status);

  const [urlCount, setUrlCount] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const remainingPollsRef = useRef<number>(10);

  const pollStatus = useCallback(async () => {
    try {
      if (document.source === 'web' && !document.status && document.url) {
        if (remainingPollsRef.current > 0) {
          const {
            data: { count }
          } = await axios.get(`/api/sources/web/${encodeURIComponent(document.url)}/count`);

          remainingPollsRef.current -= 1;

          setUrlCount(count);
          timeoutRef.current = setTimeout(pollStatus, POLLING_INTERVAL);
        }
      } else {
        const { data } = await axios.get(`/api/sources/status/${document.id}`);
        const { status: polledStatus } = data;

        if (polledStatus === 'synced' || polledStatus === 'error') {
          setStatus(polledStatus);
        } else {
          timeoutRef.current = setTimeout(pollStatus, POLLING_INTERVAL);
        }
      }
    } catch (error) {
      console.error('Error occurred while polling status:', error);
    }
  }, [document.id, document.source, document.status, document.url]);

  useEffect(() => {
    if (
      (document.source !== 'web' && !document.status) ||
      document.status === 'synced' ||
      document.status === 'error'
    ) {
      return; // do nothing if status is already "synced" or "error"
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    pollStatus();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [document.source, document.status, pollStatus]);

  if (urlCount > 0) {
    return <Typography>{urlCount} pages</Typography>;
  }

  return (
    <div>
      {!status ? null : status === 'synced' ? (
        <CheckCircle fontSize="medium" color="success" />
      ) : status === 'error' ? (
        <SyncProblem fontSize="medium" color="error" />
      ) : (
        <CircularProgress size="1.5rem" color="info" />
      )}
    </div>
  );
};
