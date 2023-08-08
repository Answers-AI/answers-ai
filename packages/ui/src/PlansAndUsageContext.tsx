import React, { createContext, useCallback, useContext } from 'react';
import { ActiveUserPlan, Plan } from 'types';
import useSWR, { KeyedMutator } from 'swr';
import type { Stripe } from 'stripe';

export interface PlanWithPriceObject extends Plan {
  priceObj?: Stripe.Price;
}

export interface PlansAndUsageContextValues {
  plans: PlanWithPriceObject[];
  activeUserPlan?: ActiveUserPlan;
  mutateActiveUserPlan: KeyedMutator<any>;
  isActivePlan: (plan: Plan) => boolean;
  goToPlanCheckout: (plan: PlanWithPriceObject) => Promise<void>;
}

const PlansAndUsageContext = createContext<PlansAndUsageContextValues>({
  plans: [],
  mutateActiveUserPlan: async () => {},
  isActivePlan: () => false,
  goToPlanCheckout: async () => {}
});

const PlansAndUsageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: activeUserPlan, mutate: mutateActiveUserPlan } = useSWR(`/api/user-plan`, (url) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.activeUserPlan)
  );

  const { data: plans } = useSWR<PlanWithPriceObject[]>('/api/plans', (url) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res.plans)
  );

  const isActivePlan = useCallback(
    (plan: Plan) => {
      return activeUserPlan?.planId === plan.id;
    },
    [activeUserPlan]
  );

  const goToPlanCheckout = useCallback(async (plan: PlanWithPriceObject) => {
    const res = await fetch(`/api/stripe/checkout`, {
      method: 'POST',
      body: JSON.stringify({ priceId: plan.priceObj?.id }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    window.location.assign((await res.json()).url);
  }, []);

  return (
    <PlansAndUsageContext.Provider
      value={{
        plans: plans || [],
        activeUserPlan,
        mutateActiveUserPlan,
        isActivePlan,
        goToPlanCheckout
      }}>
      {children}
    </PlansAndUsageContext.Provider>
  );
};

const usePlansAndUsage = () => {
  const context = useContext(PlansAndUsageContext);

  return {
    ...context
  };
};

export { PlansAndUsageContext, PlansAndUsageProvider, usePlansAndUsage };
