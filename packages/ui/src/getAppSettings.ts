import { getServerSession } from 'next-auth';
import { deepmerge } from '@utils/deepmerge';
import { authOptions } from './authOptions';
import { NO_ORG_SETTINGS } from '@utils/auth/NO_ORG_SETTINGS';
import { SYSTEM_SETTINGS } from '@utils/auth/SYSTEM_SETTINGS';
import { prisma } from 'db/dist';
import { MODELS } from '@utils/MODELS';
import { AppSettings } from 'types';

export async function getAppSettings(req?: any, res?: any): Promise<AppSettings> {
  const session = await (req && res
    ? getServerSession(req, res, authOptions)
    : getServerSession(authOptions));

  let services = SYSTEM_SETTINGS.services;
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
    let accounts = await prisma.account.findMany({
      where: {
        userId: user?.id
      }
    });
    const accountsByProvider = accounts.reduce((acc: any, account) => {
      acc[account.provider] = account;
      return acc;
    }, {});

    services = services?.map((service) => ({
      ...service,
      enabled: service.enabled || (!!service.providerId && !!accountsByProvider[service.providerId])
    }));

    if (!user?.organization) settings = NO_ORG_SETTINGS;
    settings = deepmerge(
      {},
      // JSON.parse(JSON.stringify(user.organization?.appSettings ?? {})),
      JSON.parse(JSON.stringify(user.appSettings)),
      {
        models: MODELS,
        services
      }
    );
  }

  return settings;
}
