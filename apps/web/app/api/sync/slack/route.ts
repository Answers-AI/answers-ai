import { getAppSettings } from 'getAppSettings';
import { inngest } from '../../../../src/ingestClient';

export async function POST() {
  const appSettings = await getAppSettings();
  inngest.send({
    name: 'SYNCED_SLACK',
    data: {
      appSettings
    }
  });
}
