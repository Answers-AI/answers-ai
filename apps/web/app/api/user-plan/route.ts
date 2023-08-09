import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { respond401 } from '@utils/auth/respond401';
import { getActiveUserPlan } from '@utils/plans/getActiveUserPlan';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return respond401();

  const activeUserPlan = await getActiveUserPlan(session.user);

  return NextResponse.json({
    activeUserPlan
  });
}
