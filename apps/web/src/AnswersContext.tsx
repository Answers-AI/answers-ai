'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AnswersFilters, Chat, Journey, Message } from 'types';
import { deepmerge } from 'utils/dist/deepmerge';
import { useStreamedResponse } from './useStreamedResponse';

interface AnswersContextType {
  error?: any;
  chat?: Chat | null;
  journey?: Journey | null;
  messages: Array<Message>;
  sendMessage: (args: { content: string; isNewJourney?: boolean }) => void;
  clearMessages: () => void;
  regenerateAnswer: () => void;
  isLoading: boolean;
  filters: AnswersFilters;
  updateFilter: (newFilter: AnswersFilters) => void;
  useStreaming: boolean;
  setUseStreaming: (useStreaming: boolean) => void;
}

const AnswersContext = createContext<AnswersContextType>({
  error: null,
  messages: [],
  filters: {},
  useStreaming: true,
  updateFilter: () => {},
  sendMessage: () => {},
  regenerateAnswer: () => {},
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
  chat?: Chat | null;
  journey?: Journey;
}

export function AnswersProvider({
  children,
  journey,
  chat,
  apiUrl = '/api',
  useStreaming: initialUseStreaming = false
}: AnswersProviderProps) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<Message>>(chat?.messages ?? []);
  const [filters, setFilters] = useState<AnswersFilters>(
    deepmerge({}, journey?.filters, chat?.filters)
  );
  const [useStreaming, setUseStreaming] = useState(initialUseStreaming);
  const [chatId, setChatId] = useState<string | undefined>(chat?.id);
  const [journeyId, setJourneyId] = useState<string | undefined>(journey?.id);
  const messageIdx = useRef(0);

  const addMessage = useCallback((message: Message) => {
    setMessages((currentMessages) => {
      messageIdx.current = currentMessages.length + 1;
      return [...currentMessages, message];
    });
  }, []);

  const { generateResponse } = useStreamedResponse({
    journeyId,
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
    },
    onEnd: () => setIsLoading(false)
  });

  const sendMessage = useCallback(
    async ({ content, isNewJourney }: { content: string; isNewJourney?: boolean }) => {
      setIsLoading(true);
      setError(null);
      addMessage({ role: 'user', content: content } as Message);
      try {
        if (useStreaming) {
          generateResponse(content);
        } else {
          const { data } = await axios.post(`${apiUrl}/ai/query`, {
            isNewJourney,
            journeyId,
            chatId,
            content,
            messages,
            filters
          });

          setChatId(data?.chat.id);
          setJourneyId(data?.chat.journeyId);
          addMessage(data);
          setIsLoading(false);
        }
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
      }
    },
    [addMessage, useStreaming, generateResponse, apiUrl, journeyId, chatId, messages, filters]
  );

  const updateFilter = (newFilter: AnswersFilters) => {
    setFilters(deepmerge({}, filters, newFilter));
  };

  const regenerateAnswer = () => {
    const [message] = messages.slice(-2);
    setMessages(messages.slice(0, -2));
    sendMessage(message);
  };

  const clearMessages = () => {
    setMessages([]);
    setChatId(undefined);
    setJourneyId(undefined);
    setFilters({});
    setError(null);
    router.push('/');
  };

  const contextValue = {
    chat,
    journey,
    messages,
    sendMessage,
    clearMessages,
    regenerateAnswer,
    filters,
    updateFilter,
    addMessage,
    isLoading,
    useStreaming,
    setUseStreaming,
    error
  };
  return <AnswersContext.Provider value={contextValue}>{children}</AnswersContext.Provider>;
}
