import { inngest } from './client';
import { AppSettings } from 'types';
import { User } from 'db/generated/prisma-client';
import { createStepTools } from 'inngest/components/InngestStepTools';

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
    const versions = Object.keys(eventHandlerMap[eventName]);
    return inngest.createFunction(
      { name: `Process ${eventName} event` },
      { event: eventName },
      async ({ event, ...other }) => {
        const { v } = event;
        const ts = new Date(event.ts!).toDateString();
        console.log(`[${new Date(ts)}] Received ${eventName}`);
        let handler;
        try {
          ////console.time(`[${new Date(ts)}] Processing  ${eventName}`);
          if (!v) {
            console.warn(`No version for ${eventName} using v=1`);
            handler = eventHandlerMap[eventName][1];
          } else {
            if (versions.includes(v)) {
              handler = eventHandlerMap[eventName][v];
            }
          }
          if (!handler) {
            throw new Error(`No handler for ${eventName}:${v}`);
          }
          const result = await handler({ event, ...other } as any);
          //console.timeEnd(`[${new Date(ts)}] Processing  ${eventName}`);
          return result;
        } catch (error) {
          //console.timeEnd(`[${new Date(ts)}] Processing  ${eventName}`);
          console.error(`[${new Date(ts)}] Error processing ${eventName}`);
          console.log({ eventHandlerMap, handler, error });
          throw error;
        }
      }
    );
  });

  return inngestFunctions;
};

export type EventHandler<T> = (args: {
  event: { v: string; data: T; user?: User; ts: number };
  // step: { run: (step: string, callback: () => unknown) => Promise<unknown> };
  step: ReturnType<typeof createStepTools<any, any>>[0];
}) => Promise<unknown>;

export type EventVersionHandler<T> = {
  event: string;
  v: string;
  handler: EventHandler<T>;
};

export type JiraUpdatedInput = {
  appSettings: AppSettings;
};
