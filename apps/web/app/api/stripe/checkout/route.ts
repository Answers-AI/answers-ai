import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';
import { Stripe } from 'stripe';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15'
  });
  const user = await getServerSession(authOptions);
  if (!user?.user?.id) return respond401();

  const { priceId } = await req.json();

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
    success_url:
      // TODO: need to figure out correct URL
      process.env.NEXT_PUBLIC_APP_URL ||
      `http://localhost:3000/plans?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/plans'
  });

  return NextResponse.json({ url: session.url });
}
