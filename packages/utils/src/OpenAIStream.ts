import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { ReadableByteStreamController } from 'stream/web';

export async function OpenAIStream(payload: any, extra: any, onEnd: (answer: string) => void) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;
  // @ts-expect-error
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY ?? ''}`
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });

  // @ts-expect-error
  const stream = new ReadableStream({
    async start(controller: ReadableByteStreamController) {
      controller.enqueue(encoder.encode(JSON.stringify(extra) + 'JSON_END'));

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
            // console.log('StreamChunk', text);
            if (counter < 2 && (text?.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);
      let answer = '';
      for await (const chunk of res.body as any) {
        let decoded = decoder.decode(chunk);
        answer += decoded;
        parser.feed(decoded);
      }
      onEnd(answer);
      // if (answer)
      //   await prisma.prompt.update({
      //     where: { id: savedPrompt.id },
      //     data: {
      //       answers: {
      //         createMany: {
      //           data: [{ text: answer }]
      //         }
      //       }
      //     }
      //   });
      controller.close();
    }
  });

  return stream;
}
