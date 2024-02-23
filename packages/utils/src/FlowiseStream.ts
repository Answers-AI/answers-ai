import socketIOClient from 'socket.io-client';
import { Sidekick } from 'types';
export const getFlowisePredictionStream = async ({ sidekick, body, onEnd }: any) => {
  let answer = '';
  // let message;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const socket = socketIOClient(sidekick.chatflowDomain!); //flowise url
      socket.on('connect', async () => {
        const result = await query({
          sidekick,
          socketIOClientId: socket.id!,
          body
        });

        const { sourceDocuments: contextDocuments, ...extra } = result;
        controller.enqueue(
          encoder.encode(
            'JSON_START' +
              JSON.stringify({
                ...extra,
                // id: message.id,
                // contextDocuments: message.contextDocuments,
                contextDocuments: result.sourceDocuments,
                role: 'assistant'
              }) +
              'JSON_END'
          )
        );
        onEnd &&
          onEnd({
            ...result
          });
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
};
async function query({
  sidekick,
  body,
  socketIOClientId
}: {
  sidekick: Sidekick;
  body: any;
  socketIOClientId: string;
}) {
  const { chatflow, chatflowDomain, chatflowApiKey } = sidekick;
  const response = await fetch(`${chatflowDomain}/api/v1/prediction/${chatflow?.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${chatflowApiKey}`
    },
    body: JSON.stringify({ ...body, socketIOClientId })
  });
  const result = await response.json();
  return result;
}
