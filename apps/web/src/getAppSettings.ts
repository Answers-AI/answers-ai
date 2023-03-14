import { getServerSession } from 'next-auth';
import { deepmerge } from 'utils/dist/deepmerge';
import { authOptions } from '../pages/api/auth/[...nextauth]';

import { prisma } from 'db/dist';
import { MODELS } from 'utils/dist/MODELS';

const DEFAULT_SETTINGS = {
  services: [
    { name: 'jira', enabled: true },
    { name: 'slack', enabled: true },
    { name: 'notion', enabled: false },
    { name: 'github', enabled: false },
    { name: 'drive', enabled: false },
    { name: 'contentful', enabled: false }
  ]
};

export async function getAppSettings(req?: any, res?: any) {
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
        }
      })
    : null;

  if (user) {
    return deepmerge({}, DEFAULT_SETTINGS, JSON.parse(JSON.stringify(user?.appSettings)), {
      models: MODELS
    });
  }

  return DEFAULT_SETTINGS;
}
