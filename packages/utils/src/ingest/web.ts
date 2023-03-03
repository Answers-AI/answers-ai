import { EventVersionHandler } from './EventVersionHandler';

export const processWebScrape: EventVersionHandler<{ url: string }> = {
  event: 'answers/web.scrape',
  v: '1',
  handler: async ({ event }) => {
    const data = event.data;
    console.log('processWebScrape', data.url);
  }
};
