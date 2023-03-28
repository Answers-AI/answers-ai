# MODELS.ts

This file contains a JavaScript object that defines the available models for each event type. The object is structured as follows:

```
export const MODELS = {
  jira: ['1'],
  slack: ['1'],
  web: ['1'],
  openapi: ['1'],
  confluence: ['1']
};
```

The `MODELS` object contains a list of event types as keys, and an array of model numbers as values. The model numbers indicate the version of the model that is currently supported. The leftmost model number is the default. 

This file is used to ensure that the correct model is used for each event type. It is important to keep this file up to date with the latest model numbers to ensure that the correct model is used.

# OpenAIStream

OpenAIStream is a JavaScript function that enables developers to access OpenAI's completion API and stream the response data. It takes in a payload and extra data, and returns a ReadableStream object.

## Usage

To use OpenAIStream, you must first provide a payload and extra data. The payload should be a valid JSON object, and the extra data should be a valid JSON string.

Once the payload and extra data have been provided, you can call the OpenAIStream function with the following syntax:

```
OpenAIStream(payload, extra, onEnd);
```

The `onEnd` parameter is a callback function that will be called when the stream has finished.

## Output

OpenAIStream returns a ReadableStream object that contains the response data from the OpenAI completion API. The data is encoded as a UTF-8 string, and can be decoded using the TextDecoder class.

## Example

The following example shows how to use OpenAIStream to access the OpenAI completion API and stream the response data:

```
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';

export async function OpenAIStream(payload: any, extra: any, onEnd: (answer: string) => void) {
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

  const stream = new ReadableStream({
    async start(controller) {
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
```
