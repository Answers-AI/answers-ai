import { prisma } from '@db/client';
import { User } from 'types';
import { createNewActiveUserPlan } from './createNewActiveUserPlan';
import { deactivateCurrentUserPlan } from './deactivateCurrentUserPlan';

export const getActiveUserPlan = async (user: User) => {
  let activeUserPlan = await prisma.activeUserPlan.findUnique({
    where: { userId: user.id },
    include: {
      plan: true
    }
  });

  if (!activeUserPlan) {
    activeUserPlan = await createNewActiveUserPlan(user, 1);
  }

  // if user is on the free plan and it is past the renewal date, renew the plan
  if (activeUserPlan.plan.id === 1 && activeUserPlan.renewalDate < new Date()) {
    await deactivateCurrentUserPlan(activeUserPlan);
    activeUserPlan = await createNewActiveUserPlan(user, 1);
  }

  return activeUserPlan;
};
