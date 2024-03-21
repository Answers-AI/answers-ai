import socketIOClient from 'socket.io-client';
import { Chat, Sidekick } from 'types';
export const getFlowisePredictionStream = async ({
  chat,
  sidekick,
  body,
  accessToken,
  onEnd
}: {
  chat?: Chat;
  sidekick: Sidekick;
  body: any;
  accessToken: string;
  onEnd: (extra: any) => void;
}) => {
  let answer = '';
  // let message;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  try {
    const stream = new ReadableStream({
      async start(controller) {
        // TODO: Figure out a better way to do this
        if (process.env.NODE_ENV === 'development')
          // @ts-ignore
          sidekick.chatflowDomain = sidekick.chatflowDomain?.replace('8080', '4000');

        const socket = socketIOClient(sidekick.chatflowDomain!); //flowise url
        console.log('SocketIO->start', sidekick.chatflowDomain);
        socket.on('connect', async () => {
          console.log('SocketIO->connect', sidekick.chatflowDomain);
          const chatflowChat = await query({
            sidekick,
            accessToken,
            socketIOClientId: socket.id!,
            body
          });

          controller.enqueue(
            encoder.encode(
              'JSON_START' +
                JSON.stringify({
                  ...chatflowChat,
                  chat,
                  // id: message.id,
                  // contextDocuments: message.contextDocuments,
                  contextDocuments: chatflowChat?.sourceDocuments,
                  role: 'assistant'
                }) +
                'JSON_END'
            )
          );
          onEnd &&
            (await onEnd({
              ...chatflowChat
            }));
          controller.close();
        });
        socket.on('start', () => {
          console.log('start');
        });

        socket.on('token', (token) => {
          controller.enqueue(encoder.encode(token));
        });

        socket.on('sourceDocuments', (sourceDocuments) => {
          console.log('sourceDocuments:', sourceDocuments?.length);
        });

        socket.on('end', () => {
          console.log('end');
        });
      }
    });
    return stream;
  } catch (err) {
    throw err;
  }
};
async function query({
  sidekick,
  body,
  accessToken,
  socketIOClientId
}: {
  sidekick: Sidekick;
  body: any;
  accessToken: string;
  socketIOClientId: string;
}) {
  const { chatflow, chatflowDomain } = sidekick;
  console.log('FlowiseQuery', `${chatflowDomain}/api/v1/prediction/${chatflow?.id}`);
  const response = await fetch(`${chatflowDomain}/api/v1/prediction/${chatflow?.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ ...body, socketIOClientId })
  });
  console.log(
    'FlowiseQuery->ended',
    response.ok,
    `${chatflowDomain}/api/v1/prediction/${chatflow?.id}`
  );

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    const result = await response.text();
    throw new Error(result);
  }
}
