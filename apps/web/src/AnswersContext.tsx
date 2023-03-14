'use client';
import axios from 'axios';
import { Chat } from 'db/generated/prisma-client';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AnswersFilters } from 'types';
import { deepmerge } from 'utils/dist/deepmerge';
import { useStreamedResponse } from './useStreamedResponse';

interface Message {
  role: string;
  content: string;
}

interface AnswersContextType {
  messages: Message[];
  sendMessage: (message: string) => void;
  clearMessages: () => void;
  isLoading: boolean;
  filters: AnswersFilters;
  updateFilter: (newFilter: AnswersFilters) => void;
  useStreaming: boolean;
  setUseStreaming: (useStreaming: boolean) => void;
}

const AnswersContext = createContext<AnswersContextType>({
  messages: [],
  filters: {},
  useStreaming: true,
  updateFilter: () => {},
  sendMessage: () => {},
  clearMessages: () => {},
  isLoading: false,
  setUseStreaming: () => {}
});

export function useAnswers() {
  return useContext(AnswersContext);
}

interface AnswersProviderProps {
  children: React.ReactNode;
  apiUrl?: string;
  useStreaming?: boolean;
  chat?: Chat;
}

export function AnswersProvider({
  children,
  chat,
  apiUrl = '/api',
  useStreaming: initialUseStreaming = false
}: AnswersProviderProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  // const [messageIdx, setMessageIdx] = useState(0);
  const [filters, setFilters] = useState<AnswersFilters>({});
  const [useStreaming, setUseStreaming] = useState(initialUseStreaming);
  const [chatId, setChatId] = useState(chat?.id);
  const messageIdx = useRef(0);

  const addMessage = useCallback((message: Message) => {
    setMessages((currentMessages) => {
      messageIdx.current = currentMessages.length + 1;
      return [...currentMessages, message];
    });
  }, []);

  const { isLoading, generateResponse } = useStreamedResponse({
    chatId,
    filters,
    messages,
    apiUrl,
    onChunk: (chunk: Message) => {
      // const idx = messages?.length;
      setMessages((currentMessages) => {
        const newMessages = [...currentMessages];
        newMessages[messageIdx.current] = chunk;
        return newMessages;
      });
    }
  });

  const sendMessage = useCallback(
    async (prompt: string) => {
      addMessage({ role: 'user', content: prompt });
      if (useStreaming) {
        generateResponse(prompt);
      } else {
        const { data } = await axios.post(`${apiUrl}/ai/query`, {
          chatId,
          prompt,
          messages,
          filters
        });

        setChatId(data?.chat.id);
        addMessage(data);
      }
    },
    [useStreaming, generateResponse, apiUrl, messages, filters, addMessage]
  );

  const updateFilter = (newFilter: AnswersFilters) => {
    setFilters(deepmerge({}, filters, newFilter));
  };

  const clearMessages = () => {
    setMessages([]);
    router.push('/');
  };

  const contextValue = {
    messages,
    sendMessage,
    clearMessages,
    filters,
    updateFilter,
    addMessage,
    isLoading,
    useStreaming,
    setUseStreaming
  };
  return <AnswersContext.Provider value={contextValue}>{children}</AnswersContext.Provider>;
}
