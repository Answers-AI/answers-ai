import { SYSTEM_SETTINGS } from '@utils/auth/SYSTEM_SETTINGS';

import { AppSettings } from 'types';
import getCachedSession from './getCachedSession';

export async function getAppSettings(req?: any, res?: any): Promise<AppSettings> {
  const session = await (req && res ? getCachedSession(req, res) : getCachedSession());

  let settings = SYSTEM_SETTINGS;
  if (session?.user) {
    settings = session.user.appSettings as AppSettings;
  }

  settings.flowiseHostName = settings.flowiseHostName ?? process.env.FLOWISE_DOMAIN;
  return settings;
}
