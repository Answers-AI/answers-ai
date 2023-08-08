import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';
import { Stripe } from 'stripe';
import { upgradeUserPlan } from '@utils/plans/upgradeUserPlan';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15'
  });
  const user = await getServerSession(authOptions);
  if (!user?.user?.id) return respond401();

  const { sessionId } = await req.json();

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (!session) return NextResponse.json({ error: 'Session not found' });
  if (!session.subscription)
    return NextResponse.json({ error: 'Subscription ID not found in session' });
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
  if (!subscription) return NextResponse.json({ error: 'Subscription not found' });

  if (!subscription.metadata.planId)
    return NextResponse.json({ error: 'Plan ID not found in subscription' });

  const renewalDate = new Date(subscription.current_period_end * 1000);
  await upgradeUserPlan(user.user, Number(subscription.metadata.planId), renewalDate);

  return NextResponse.json({ success: true });
}
