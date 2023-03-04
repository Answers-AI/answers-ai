'use client';
import { useState } from 'react';

export const useStreamedResponse = ({ messages, addMessage }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const [generatedResponse, setGeneratedResponse] = useState<any>({});
  const generateResponse = async (aPrompt: string) => {
    setGeneratedResponse('');
    setIsLoading(true);
    const response = await fetch('/api/ai/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: aPrompt,
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
    let message;
    let extra: any;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      if (!extra) {
        setGeneratedResponse((prev: any) => {
          let current = (prev?.message || '') + chunkValue;
          const [jsonData, ...rest] = current.split('JSON_END');

          if (jsonData && rest?.length) {
            try {
              extra = JSON.parse(jsonData);
            } catch (e) {
              console.log('ParseError', e);
            }
            current = rest.join('');
          }
          message = current;
          return { message: current, ...extra };
        });
      } else {
        // console.log('OnChunk', { curr, jsonData });
        setGeneratedResponse((prev: any) => {
          const curr = (prev?.message || '') + chunkValue;
          console.log('OnChunk', { curr, extra });

          message = curr;
          return { message: curr, ...extra };
        });
      }
    }
    addMessage({ message: message, ...extra });
    setGeneratedResponse({});
    setIsLoading(false);
  };
  return { isLoading, generatedResponse, generateResponse };
};
