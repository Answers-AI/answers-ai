'use client';
// useStreamedResponse.ts
import { useState } from 'react';
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

const parseMessages = (messages?: any[]) =>
  messages?.map(({ role, content }) => ({ role, content }));
export const useStreamedResponse = ({
  apiUrl,
  onChunk,
  onEnd
}: // setChat
{
  apiUrl: string;
  onChunk: (chunk: Message) => void;
  onEnd: (chunk: Message) => void;
  // setChat: (chat: Chat) => void;
}) => {
  const [isStreaming, setIsStreaming] = useState(false);

  const [generatedResponse, setGeneratedResponse] = useState<any>({});

  const generateResponse = async ({
    content,
    chatId,
    journeyId,
    messages,
    filters,
    sidekick,
    gptModel
  }: GenerateResponseArgs) => {
    setGeneratedResponse('');
    setIsStreaming(true);

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
        sidekick: sidekick?.value, // Add sidekick parameter
        gptModel // Add gptModel parameter
      })
    });

    if (!response.ok) {
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
            // if (extra.chat) setChat(extra.chat);
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
    onEnd({ role: 'assistant', content, ...extra });
  };
  return { isStreaming, generatedResponse, generateResponse };
};
