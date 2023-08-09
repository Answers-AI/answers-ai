import React, { createContext, useCallback, useContext } from 'react';
import { ActiveUserPlan, Plan } from 'types';
import useSWR, { KeyedMutator } from 'swr';
import type { Stripe } from 'stripe';

export interface PlanWithPriceObject extends Plan {
  priceObj?: Stripe.Price;
}

export interface PlansContextValues {
  plans: PlanWithPriceObject[];
  activeUserPlan?: ActiveUserPlan;
  mutateActiveUserPlan: KeyedMutator<any>;
  isActivePlan: (plan: Plan) => boolean;
  goToPlanCheckout: (plan: PlanWithPriceObject) => Promise<void>;
  handleCancelPlan: (onEnd: Function) => Promise<void>;
}

const PlansContext = createContext<PlansContextValues>({
  plans: [],
  mutateActiveUserPlan: async () => {},
  isActivePlan: () => false,
  goToPlanCheckout: async () => {},
  handleCancelPlan: async () => {}
});

const PlansProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: activeUserPlan, mutate: mutateActiveUserPlan } = useSWR(`/api/user-plan`, (url) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => ({
        ...data.activeUserPlan,
        renewalDate: new Date(data.activeUserPlan.renewalDate)
      }))
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

  const handleCancelPlan = useCallback(
    async (onEnd: Function) => {
      const data = await fetch(`/api/user-plan/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json());

      if (data.success) {
        await mutateActiveUserPlan();
      }
      onEnd();
    },
    [mutateActiveUserPlan]
  );

  return (
    <PlansContext.Provider
      value={{
        plans: plans || [],
        activeUserPlan,
        mutateActiveUserPlan,
        isActivePlan,
        goToPlanCheckout,
        handleCancelPlan
      }}>
      {children}
    </PlansContext.Provider>
  );
};

const usePlans = () => {
  const context = useContext(PlansContext);

  return {
    ...context
  };
};

export { PlansContext as PlansAndUsageContext, PlansProvider as PlansAndUsageProvider, usePlans };
