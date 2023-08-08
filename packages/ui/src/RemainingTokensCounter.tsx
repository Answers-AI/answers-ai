'use client';

import { Box, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useFlags } from 'flagsmith/react';
import { usePlansAndUsage } from './PlansAndUsageContext';

function formatDate(datestr?: any) {
  if (!datestr) return '';
  const date = new Date(datestr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export const RemaningTokensCounter: React.FC = () => {
  const { activeUserPlan } = usePlansAndUsage();
  const flags = useFlags(['unlimited_tier']);

  const remainingTokens = flags.unlimited_tier.enabled ? Infinity : activeUserPlan?.tokensLeft ?? 0;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography>
        {!activeUserPlan ? (
          'Calculating remaining tokens...'
        ) : remainingTokens <= 0 ? (
          <>
            You are out of tokens on the {activeUserPlan?.plan.name} plan. Your plan will renew with{' '}
            {activeUserPlan?.plan.tokenLimit} tokens on {formatDate(activeUserPlan?.renewalDate)}.
            {activeUserPlan?.planId === 1 && (
              <>
                {' '}
                Click <NextLink href="/plans">here</NextLink> to upgrade to the pro plan.
              </>
            )}
          </>
        ) : (
          <>Tokens remaining: {flags.unlimited_tier.enabled ? 'unlimited' : remainingTokens}</>
        )}
      </Typography>
    </Box>
  );
};
