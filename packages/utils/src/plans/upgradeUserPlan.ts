import { User } from 'types';
import { getActiveUserPlan } from './getActiveUserPlan';
import { deactivateCurrentUserPlan } from './deactivateCurrentUserPlan';
import { createNewActiveUserPlan } from './createNewActiveUserPlan';

export const upgradeUserPlan = async (user: User, planId: number, renewalDate: Date) => {
  const activeUserPlan = await getActiveUserPlan(user);
  await deactivateCurrentUserPlan(activeUserPlan);
  const newUserPlan = await createNewActiveUserPlan(user, planId, renewalDate);
  return newUserPlan;
};
