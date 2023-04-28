import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { inngest } from './ingest/client';

interface CompletionResponse {
  text: string;
}
export async function OpenAIStream(
  payload: any,
  extra: any,
  onEnd: (response: CompletionResponse) => void
) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY ?? ''}`
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });

  let answer = '';
  const stream = new ReadableStream({
    async start(controller) {
      // controller.enqueue(encoder.encode(JSON.stringify(extra) + 'JSON_END')); // TODO: Need to get this back in. Was breaking the response when code was added to the prompt

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
      onEnd({ ...extra, text: answer });

      controller.close();
    }
  });

  return stream;
}
