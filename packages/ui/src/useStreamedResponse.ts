'use client';
// useStreamedResponse.ts
import { useState } from 'react';
import { Message } from 'types';

export const useStreamedResponse = ({
  chatId,
  journeyId,
  messages,
  filters,
  apiUrl,
  onChunk,
  onEnd,
  sidekick,
  gptModel
}: {
  journeyId?: string;
  chatId?: string;
  messages?: any[];
  filters?: any;
  apiUrl: string;
  onChunk: (chunk: Message) => void;
  onEnd: () => void;
  sidekick?: string;
  gptModel?: string;
}) => {
  const [isStreaming, setIsStreaming] = useState(false);

  const [generatedResponse, setGeneratedResponse] = useState<any>({});
  interface GenerateResponseArgs {
    content: string;
    sidekick?: string;
    gptModel?: string;
  }
  const generateResponse = async ({ content, sidekick, gptModel }: GenerateResponseArgs) => {
    setGeneratedResponse('');
    setIsStreaming(true);
    console.log('[AI][Stream] Starting: ', {
      content,
      journeyId,
      chatId,
      filters,
      sidekick,
      gptModel
    });
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
        messages,
        sidekick, // Add sidekick parameter
        gptModel // Add gptModel parameter
      })
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let extra: any;
    let answer = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      answer = (answer || '') + chunkValue;
      if (!extra) {
        const [jsonData, ...rest] = answer.split('JSON_END');
        if (jsonData && rest?.length) {
          try {
            extra = JSON.parse(jsonData);
            console.log('ParsedExtra', extra);
          } catch (e) {
            console.log('ParseError', e);
          }
          answer = rest.join('');
        }
        onChunk({ role: 'assistant', content: answer, ...extra });
      } else {
        onChunk({ role: 'assistant', content: answer, ...extra });
      }
    }
    setGeneratedResponse({});
    setIsStreaming(false);
    onEnd();
  };
  return { isLoading: isStreaming, generatedResponse, generateResponse };
};
