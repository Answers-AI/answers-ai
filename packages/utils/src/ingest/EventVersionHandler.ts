import { inngest } from './client';
import { AppSettings } from 'types';

export const createInngestFunctions = (eventHandlers: EventVersionHandler<unknown>[]) => {
  // Group all functions by event name and version i.e eventHandlerMap['user.created']['1']
  const eventHandlerMap = eventHandlers
    ?.filter((eventHandler) => eventHandler.event && eventHandler.v && eventHandler.handler)
    ?.reduce(
      (
        acc: { [event: string]: { [version: string]: EventHandler<unknown> } },
        { event, v, handler }
      ) => {
        acc[event] = acc[event] || {};
        acc[event][v] = handler;
        return acc;
      },
      {}
    );

  const inngestFunctions = Object.keys(eventHandlerMap).map((eventName) => {
    return inngest.createFunction(
      { name: `Process ${eventName} event` },
      { event: eventName },
      async ({ event, ts, ...other }) => {
        try {
          console.time(`[${ts}]Processing  ${eventName}`);
          const versions = Object.keys(eventHandlerMap[eventName]);
          let handler;
          if (!event.v) {
            throw new Error(`No version for ${eventName}`);
          } else {
            if (versions.includes(event.v)) {
              handler = eventHandlerMap[eventName][event.v];
            } else {
              throw new Error(`No handler for ${eventName}:${event.v}`);
            }
          }
          await handler({ event, ts, ...other } as any);
          console.timeEnd(`[${ts}]Processing  ${eventName}`);
        } catch (error) {
          console.error(`[${ts}]Error processing ${eventName}`);
          console.log(error);
          throw error;
        }
      }
    );
  });

  return inngestFunctions;
};

export type EventHandler<T> = (args: {
  event: { v: string; data: T; user?: any };
}) => Promise<void>;

export type EventVersionHandler<T> = {
  event: string;
  v: string;
  handler: EventHandler<T>;
};
export type JiraUpdatedInput = {
  appSettings: AppSettings;
};
