import { prisma } from '@db/client';
import { User } from 'types';

export const createNewActiveUserPlan = async (user: User, planId: number, renewalDate?: Date) => {
  if (!renewalDate) {
    renewalDate = new Date();
    renewalDate.setMonth(renewalDate.getMonth() + 1);
  }

  const plan = await prisma.plan.findUnique({
    where: {
      id: planId
    },
    select: {
      id: true,
      tokenLimit: true
    }
  });

  if (!plan) {
    throw new Error(`Plan with id ${planId} not found`);
  }

  // create a free plan with renewal date in 1 month
  const activeUserPlan = await prisma.activeUserPlan.create({
    data: {
      planId: plan.id,
      userId: user.id,
      renewalDate,
      tokensLeft: plan.tokenLimit
    },
    include: {
      plan: true
    }
  });

  return activeUserPlan;
};
