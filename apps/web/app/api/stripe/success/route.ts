import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';
import { subscribeToUserPlan } from '@utils/plans/subscribeToUserPlan';
import { getStripeClient } from '@utils/stripe/getStripeClient';

export async function POST(req: Request) {
  const user = await getServerSession(authOptions);
  if (!user?.user?.id) return respond401();

  const { sessionId } = await req.json();

  const stripe = getStripeClient();

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (!session) return NextResponse.json({ error: 'Session not found' });
  if (!session.subscription)
    return NextResponse.json({ error: 'Subscription ID not found in session' });
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
  if (!subscription) return NextResponse.json({ error: 'Subscription not found' });

  if (!subscription.metadata.planId)
    return NextResponse.json({ error: 'Plan ID not found in subscription' });

  const renewalDate = new Date(subscription.current_period_end * 1000);
  await subscribeToUserPlan({
    user: user.user,
    planId: Number(subscription.metadata.planId),
    renewalDate,
    stripeSubscriptionId: subscription.id
  });

  return NextResponse.json({ success: true });
}
