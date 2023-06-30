import { getAppSettings } from '@ui/getAppSettings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
import { inngest } from '@utils/ingest/client';
import { NextResponse, NextRequest } from 'next/server';

const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
const AWS_S3_REGION = process.env.AWS_S3_REGION;

export async function POST(req: Request, res: NextResponse) {
  if (!AWS_S3_REGION || !AWS_S3_BUCKET) {
    return NextResponse.json({
      status: 'error',
      message: 'You must use valid keys to perform this action.'
    });
  }

  const appSettings = await getAppSettings();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({
      status: 'error',
      message: 'You must be logged in to perform this action.'
    });
  }

  const { documentName } = await req.json();

  if (!documentName) {
    return NextResponse.json({
      status: 'error',
      message: 'No documentName found in request headers.'
    });
  }

  await inngest.send({
    v: '1',
    ts: new Date().valueOf(),
    name: 'documents/aws.index',
    user,
    data: { appSettings, documentName }
  });

  return NextResponse.json({ status: 'ok' });
}
