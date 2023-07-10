import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { prisma } from '@db/client';
import { inngest } from './ingest/client';
import { Chat, User, Document, Message } from 'types';
interface CompletionResponse {
  text: string;
  message: Message;
}
interface StreamExtra {
  user: User;
  chat: Chat;
  context: string;
  contextDocuments: Document[];
  [key: string]: any;
}
export async function OpenAIStream(
  payload: any,
  extra: StreamExtra,
  onEnd: (response: CompletionResponse) => void
) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const { user, chat, context, contextDocuments } = extra;
  let counter = 0;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY ?? ''}`
    },
    method: 'POST',
    body: JSON.stringify(payload)
  }).catch((e) => {
    console.log('OpenAIStream', e);
    throw e;
  });
  let answer = '';
  let message;
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode(JSON.stringify(extra) + 'JSON_END')); // TODO: Need to get this back in. Was breaking the response when code was added to the prompt
      message = await prisma.message.create({
        data: {
          context,
          contextDocuments: {
            connect: contextDocuments.map(({ id }) => ({ id }))
          },
          content: '',
          chat: { connect: { id: chat.id } },
          role: 'assistant'
        }
      });

      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data;
          if (data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;

            if (counter < 2 && (text?.match(/\n/) || []).length) {
              return;
            }
            answer += text ?? '';
            const queue = encoder.encode(text);

            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        let decoded = decoder.decode(chunk);
        parser.feed(decoded);
      }
      // TODO: Add tokens consumed in this completion
      onEnd({ ...extra, text: answer, message });
      message = await prisma.message.update({
        where: { id: message.id },
        data: {
          content: answer
        }
      });
      await inngest.send({
        v: '1',
        ts: new Date().valueOf(),
        name: 'answers/message.sent',
        user: user,
        data: {
          role: 'user',
          messageId: message.id,
          chatId: chat.id,
          content: payload.prompt
          //  sidekick,
          // gptModel
        }
      });
      controller.close();
    }
  });

  return stream;
}
