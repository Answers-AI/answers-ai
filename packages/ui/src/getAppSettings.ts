import { getServerSession } from 'next-auth';
import { deepmerge } from '@utils/deepmerge';
import { authOptions } from './authOptions';

import { prisma } from 'db/dist';
import { MODELS } from '@utils/MODELS';

const DEFAULT_SETTINGS = {
  services: [
    { name: 'jira', enabled: true, imageURL: '/static/images/jira.png' },
    { name: 'slack', enabled: true, imageURL: '/static/images/slack.png' },
    { name: 'notion', enabled: false, imageURL: '/static/images/notion.png' },
    { name: 'github', enabled: false, imageURL: '/static/images/github.png' },
    { name: 'drive', enabled: false, imageURL: '/static/images/drive.png' },
    { name: 'contentful', enabled: false, imageURL: '/static/images/contentful.png' },
    { name: 'confluence', enabled: true, imageURL: '/static/images/confluence.png' }
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
