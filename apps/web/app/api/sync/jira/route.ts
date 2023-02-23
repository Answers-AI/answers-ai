import { Inngest } from 'inngest';
import { getAppSettings } from 'getAppSettings';

const inngest = new Inngest({ name: 'My App' });
export async function POST() {
  const appSettings = await getAppSettings();
  inngest.send({
    name: 'SYNCED_JIRA',
    data: {}
  });
}
