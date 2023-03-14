'use client';
import { useState } from 'react';

export const useStreamedResponse = ({
  chatId,
  messages,
  filters,
  apiUrl,
  onChunk,
  onEnd
}: {
  chatId?: string;
  messages?: any[];
  filters?: any;
  apiUrl: string;
  onChunk: (chunk: { role: string; content: string }) => void;
  onEnd: () => void;
}) => {
  const [isStreaming, setIsStreaming] = useState(false);

  const [generatedResponse, setGeneratedResponse] = useState<any>({});
  const generateResponse = async (aPrompt: string) => {
    setGeneratedResponse('');
    setIsStreaming(true);
    const response = await fetch(`${apiUrl || '/api'}/ai/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatId,
        prompt: aPrompt,
        filters,
        messages
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
    // let curr = '';
    let extra: any;
    let content = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      content = (content || '') + chunkValue;
      if (!extra) {
        const [jsonData, ...rest] = content.split('JSON_END');
        if (jsonData && rest?.length) {
          try {
            extra = JSON.parse(jsonData);
            console.log('ParsedExtra', extra);
          } catch (e) {
            console.log('ParseError', e);
          }
          content = rest.join('');
        }
        onChunk({ role: 'assistant', content, ...extra });
      } else {
        // console.log('OnChunk', { curr, jsonData });
        // console.log('OnChunk', { curr, extra });
        onChunk({ role: 'assistant', content, ...extra });
      }
    }
    setGeneratedResponse({});
    setIsStreaming(false);
    onEnd();
  };
  return { isLoading: isStreaming, generatedResponse, generateResponse };
};
