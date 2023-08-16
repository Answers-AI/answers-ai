import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';
import { getStripeClient } from '@utils/stripe/getStripeClient';
import { getActiveUserPlan } from '@utils/plans/getActiveUserPlan';
import { updateActiveUserPlan } from '@utils/plans/updateActiveUserPlan';

export async function POST(req: Request) {
  const user = await getServerSession(authOptions);
  if (!user?.user?.id) return respond401();

  const stripe = getStripeClient();

  const activePlan = await getActiveUserPlan(user.user);

  const { stripeSubscriptionId } = activePlan;

  if (!stripeSubscriptionId) {
    return NextResponse.json({ error: 'No active subscription found' });
  }

  const subscription = await stripe.subscriptions.update(stripeSubscriptionId, {
    cancel_at_period_end: true
  });

  const updatedPlan = await updateActiveUserPlan(activePlan.id, {
    shouldRenew: false
  });

  return NextResponse.json({ success: true });
}
