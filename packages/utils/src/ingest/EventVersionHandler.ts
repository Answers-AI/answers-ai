import { inngest } from './client';
import { AppSettings } from 'types';
import { User } from 'db/generated/prisma-client';

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
      async ({ event, ...other }) => {
        const { ts, v } = event;
        try {
          console.time(`[${ts}] Processing  ${eventName}`);
          const versions = Object.keys(eventHandlerMap[eventName]);
          let handler;
          if (!v) {
            console.warn(`No version for ${eventName} using v=1`);
            handler = eventHandlerMap[eventName][1];
          } else {
            if (versions.includes(v)) {
              handler = eventHandlerMap[eventName][v];
            } else {
              throw new Error(`No handler for ${eventName}:${v}`);
            }
          }
          await handler({ event, ...other } as any);
          console.timeEnd(`[${ts}] Processing  ${eventName}`);
        } catch (error) {
          console.timeEnd(`[${ts}] Processing  ${eventName}`);
          console.error(`[${ts}] Error processing ${eventName}`);
          console.log(error);
          throw error;
        }
      }
    );
  });

  return inngestFunctions;
};

export type EventHandler<T> = (args: {
  event: { v: string; data: T; user?: User; ts: number };
  step: any;
}) => Promise<unknown>;

export type EventVersionHandler<T> = {
  event: string;
  v: string;
  handler: EventHandler<T>;
};
export type JiraUpdatedInput = {
  appSettings: AppSettings;
};
