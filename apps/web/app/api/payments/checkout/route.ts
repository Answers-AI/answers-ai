import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';
import { getStripeClient } from '@utils/stripe/getStripeClient';

export async function POST(req: Request) {
  const user = await getServerSession(authOptions);
  if (!user?.user?.id) return respond401();

  const { priceId, origin } = await req.json();

  const stripe = getStripeClient();

  const price = await stripe.prices.retrieve(priceId);

  if (!price) return NextResponse.json({ error: 'Price not found' });

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    subscription_data: {
      metadata: {
        planId: price.metadata.planId
      }
    },
    success_url: `${origin}/plans?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/plans`
  });

  return NextResponse.json({ url: session.url });
}
