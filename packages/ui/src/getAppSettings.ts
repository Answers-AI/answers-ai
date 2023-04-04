import { getServerSession } from 'next-auth';
import { deepmerge } from '@utils/deepmerge';
import { authOptions } from './authOptions';
import { NO_ORG_SETTINGS, SYSTEM_SETTINGS } from '@utils/auth/syncAppSettings';
import { prisma } from 'db/dist';
import { MODELS } from '@utils/MODELS';

export async function getAppSettings(req?: any, res?: any) {
  console.log('Session', req);
  const session = await (req && res
    ? getServerSession(req, res, authOptions)
    : getServerSession(authOptions));
  // if (!session?.user?.email) return NextResponse.redirect('/auth');
  // TODO: Move this into a middleware

  // TODO: Verify user ownership or permisson scope
  let user = session?.user?.email
    ? await prisma.user.findUnique({
        where: {
          email: session?.user?.email
        },
        include: { organization: true }
      })
    : null;

  let settings = SYSTEM_SETTINGS;
  if (user) {
    if (!user?.organization) settings = NO_ORG_SETTINGS;
    console.log('UserOrg', user.organization);
    settings = deepmerge(
      {},
      JSON.parse(JSON.stringify(user.organization?.appSettings ?? {})),
      JSON.parse(JSON.stringify(user.appSettings)),
      {
        models: MODELS,
        services: SYSTEM_SETTINGS.services
      }
    );
  }

  return settings;
}
