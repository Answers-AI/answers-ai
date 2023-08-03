'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { DocumentFilter } from 'types';
import { Box, CircularProgress, Typography } from '@mui/material';
import SyncProblem from '@mui/icons-material/SyncProblem';
import axios from 'axios';

const POLLING_INTERVAL = 3000;

export const FilterStatus = ({
  documentFilter,
  source
}: {
  documentFilter: DocumentFilter;
  source: string;
}) => {
  const [status, setStatus] = useState<string | undefined>(documentFilter.status);
  const [itemsCount, setItemsCount] = useState(documentFilter.count ?? 0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const remainingPollsRef = useRef<number>(10);

  const statusUrl = useMemo(
    () =>
      `/api/sources/status?id=${documentFilter.documentId}&source=${source}&value=${documentFilter.value}`,
    [documentFilter.value, documentFilter.documentId, source]
  );

  const pollStatus = useCallback(async () => {
    try {
      const { data } = await axios.get(statusUrl);
      const { count, status: polledStatus, error } = data;

      if (error) {
        setStatus(undefined);
        return;
      }

      if (polledStatus) {
        setStatus(polledStatus);
      }
      setItemsCount(count || 0);

      if (polledStatus !== 'synced' && polledStatus != 'error' && remainingPollsRef.current > 0) {
        remainingPollsRef.current--;
        timeoutRef.current = setTimeout(pollStatus, POLLING_INTERVAL);
      }
    } catch (err: any) {
      console.error(err);
      setStatus('error');
    }
  }, [statusUrl]);

  useEffect(() => {
    if (documentFilter.status === 'synced' || documentFilter.status === 'error') {
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
  }, [documentFilter.status, pollStatus]);

  return (
    <>
      {itemsCount > 1 ? (
        <Typography>{itemsCount} records</Typography>
      ) : !status ? null : status === 'synced' ? (
        <CheckCircle fontSize="medium" color="success" />
      ) : status === 'error' ? (
        <SyncProblem fontSize="medium" color="error" />
      ) : (
        <CircularProgress size="1.5rem" color="info" />
      )}
    </>
  );
};
