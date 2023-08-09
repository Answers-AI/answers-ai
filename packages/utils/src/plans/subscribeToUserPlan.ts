import { User } from 'types';
import { getActiveUserPlan } from './getActiveUserPlan';
import { deactivateCurrentUserPlan } from './deactivateCurrentUserPlan';
import { createNewActiveUserPlan } from './createNewActiveUserPlan';

export const subscribeToUserPlan = async ({
  user,
  planId,
  renewalDate,
  stripeSubscriptionId
}: {
  user: User;
  planId: number;
  renewalDate: Date;
  stripeSubscriptionId: string;
}) => {
  const activeUserPlan = await getActiveUserPlan(user);
  await deactivateCurrentUserPlan(activeUserPlan);
  const newUserPlan = await createNewActiveUserPlan({
    user,
    planId,
    renewalDate,
    stripeSubscriptionId
  });
  return newUserPlan;
};
