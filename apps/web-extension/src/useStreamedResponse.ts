'use client';
import { useState } from 'react';

export const useStreamedResponse = ({ answers, addAnswer }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const [generatedResponse, setGeneratedResponse] = useState<any>({});
  const generateResponse = async (aPrompt: string) => {
    setGeneratedResponse('');
    setIsLoading(true);
    const response = await fetch(import.meta.env.VITE_API_URL + '/ai/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: aPrompt,
        answers
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
    let answer;
    let extra: any;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      if (!extra) {
        setGeneratedResponse((prev: any) => {
          let current = (prev?.answer || '') + chunkValue;
          const [jsonData, ...rest] = current.split('JSON_END');

          if (jsonData && rest?.length) {
            try {
              extra = JSON.parse(jsonData);
            } catch (e) {
              console.log('ParseError', e);
            }
            current = rest.join('');
          }
          answer = current;
          return { answer: current, ...extra };
        });
      } else {
        // console.log('OnChunk', { curr, jsonData });
        setGeneratedResponse((prev: any) => {
          const curr = (prev?.answer || '') + chunkValue;
          // console.log('OnChunk', { curr, extra });

          answer = curr;
          return { answer: curr, ...extra };
        });
      }
    }
    addAnswer({ answer: answer, ...extra });
    setGeneratedResponse({});
    setIsLoading(false);
  };
  return { isLoading, generatedResponse, generateResponse };
};
