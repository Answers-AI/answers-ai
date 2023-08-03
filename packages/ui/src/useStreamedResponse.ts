import { useState, useEffect } from 'react';
import { Message, Sidekick } from 'types';

interface GenerateResponseArgs {
  content: string;
  journeyId?: string;
  chatId?: string;
  messages?: any[];
  filters?: any;
  sidekick?: Sidekick;
  gptModel?: string;
}

const JSON_SPLIT_STRING: string = process.env.JSON_SPLIT_STRING || '';

const parseMessages = (messages?: any[]) =>
  messages?.map(({ role, content }) => ({ role, content }));

export const useStreamedResponse = ({
  apiUrl,
  onChunk,
  onEnd,
  onError
}: {
  apiUrl: string;
  onChunk: (chunk: Message) => void;
  onEnd: (chunk: Message) => void;
  onError: (err: any) => void;
}) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState<any>({});
  const [controller, setController] = useState<AbortController | null>(null);

  const generateResponse = async ({
    content,
    chatId,
    journeyId,
    messages,
    filters,
    sidekick,
    gptModel
  }: GenerateResponseArgs) => {
    setGeneratedResponse({});
    setIsStreaming(true);

    const abortController = new AbortController();
    setController(abortController);

    let done = false;
    try {
      const response = await fetch(`${apiUrl || '/api'}/ai/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          journeyId,
          chatId,
          prompt: content,
          filters,
          messages: parseMessages(messages),
          sidekick,
          gptModel
        }),
        signal: abortController.signal
      });

      if (!response.ok) {
        const body = await response.json();
        throw body.code ? body : { code: response.statusText };
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body reader is not available.');
      }

      let extra: any;
      let answer = '';

      while (!done) {
        try {
          const { value, done: doneReading } = await reader.read().catch((error) => {
            throw new Error('Error reading response stream: ' + error.message);
          });
          done = doneReading;

          if (value) {
            const chunkValue = new TextDecoder().decode(value);
            answer += chunkValue;

            const [jsonData, ...rest] = answer.split(JSON_SPLIT_STRING);

            if (jsonData && rest?.length) {
              try {
                extra = JSON.parse(jsonData);
              } catch (e) {
                console.log('ParseError', e);
                done = true;
              }
              answer = rest.join('');
            }

            onChunk({ role: 'assistant', content: answer, ...extra });
          }
        } catch (e) {
          console.log('While Error', e);
          done = true;
        }
      }

      onEnd({ role: 'assistant', content, ...extra });
    } catch (error) {
      onError(error);
    } finally {
      setIsStreaming(false);
      setGeneratedResponse({});
      done = true;
    }
  };

  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [controller]);

  return { isStreaming, generatedResponse, generateResponse };
};
