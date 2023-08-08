'use client';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography
} from '@mui/material';
import { usePlansAndUsage } from './PlansAndUsageContext';
import { useEffect, useState } from 'react';

export const PricingPlans: React.FC = () => {
  const { plans, isActivePlan, goToPlanCheckout, mutateActiveUserPlan } = usePlansAndUsage();
  const [loading, setLoading] = useState(false);
  // check for session_id in url
  useEffect(() => {
    const awaitPlanCreation = async () => {
      try {
        const res = await fetch(`/api/stripe/success`, {
          method: 'POST',
          body: JSON.stringify({ sessionId }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (data.success) {
          await mutateActiveUserPlan();
          setLoading(false);
        } else {
          // TODO: error messaging
          setLoading(false);
        }
      } catch (err) {
        // TODO: error messaging
        setLoading(false);
      }
    };
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    if (sessionId) {
      setLoading(true);
      awaitPlanCreation();
    }
  }, [mutateActiveUserPlan]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: 'flex', gap: 1, padding: 1 }}>
          {plans?.map((plan) => (
            <Card key={plan.id} variant={isActivePlan(plan) ? 'outlined' : 'elevation'}>
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  {isActivePlan(plan) && (
                    <Typography variant="body2" color="textSecondary" align="right">
                      Current Plan
                    </Typography>
                  )}
                  <Typography variant="h5">{plan.name}</Typography>
                  {plan.priceObj?.unit_amount && (
                    <Typography variant="h6">${plan.priceObj.unit_amount / 100}/month</Typography>
                  )}
                  <Typography variant="body1">{plan.description}</Typography>
                  {plan.id !== 1 && !isActivePlan(plan) && (
                    <CardActions sx={{ justifyContent: 'center' }}>
                      <Button size="small" onClick={() => goToPlanCheckout(plan)}>
                        Subscribe
                      </Button>
                    </CardActions>
                  )}
                </CardContent>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};
