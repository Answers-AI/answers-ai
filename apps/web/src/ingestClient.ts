import { Inngest } from 'inngest';
type Events = { [key: string]: any };
export const inngest = new Inngest<Events>({ name: 'My App' });
