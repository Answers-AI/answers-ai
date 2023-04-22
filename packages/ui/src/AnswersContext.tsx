'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AnswersFilters, AppSettings, Chat, Journey, Message, Prompt } from 'types';
import { deepmerge } from '@utils/deepmerge';
import { useStreamedResponse } from './useStreamedResponse';

interface AnswersContextType {
  appSettings: AppSettings;
  error?: any;
  chat?: Chat | null;
  journey?: Journey | null;
  messages?: Array<Message>;
  prompts?: Array<Prompt>;
  chats?: Array<Chat>;
  sendMessage: (args: { content: string; isNewJourney?: boolean }) => void;
  clearMessages: () => void;
  regenerateAnswer: () => void;
  isLoading: boolean;
  filters: AnswersFilters;
  updateFilter: (newFilter: AnswersFilters) => void;
  useStreaming: boolean;
  setUseStreaming: (useStreaming: boolean) => void;
  showFilters?: boolean;
  setShowFilters: (showFilters: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  deleteChat: (id: string) => Promise<void>;
  deletePrompt: (id: string) => Promise<void>;
  deleteJourney: (id: string) => Promise<void>;
  updateMessage: (message: Partial<Message>) => Promise<void>;
  updateChat: (chat: Partial<Chat>) => Promise<void>;
  updatePrompt: (prompt: Partial<Prompt>) => Promise<void>;
  updateJourney: (journey: Partial<Journey>) => Promise<void>;
}
const AnswersContext = createContext<AnswersContextType>({
  appSettings: {},
  error: null,
  messages: [],
  chats: [],
  prompts: [],
  filters: {},
  updateFilter: () => {},
  sendMessage: () => {},
  regenerateAnswer: () => {},
  clearMessages: () => {},
  isLoading: false,
  inputValue: '',
  useStreaming: true,
  setUseStreaming: () => {},
  showFilters: false,
  setShowFilters: () => {},
  setInputValue: () => {},
  deleteChat: async () => {},
  deletePrompt: async () => {},
  deleteJourney: async () => {},
  updateMessage: async () => {},
  updateChat: async () => {},
  updatePrompt: async () => {},
  updateJourney: async () => {}
});

export function useAnswers() {
  return useContext(AnswersContext);
}

interface AnswersProviderProps {
  children: React.ReactNode;
  appSettings: AppSettings;
  apiUrl?: string;
  useStreaming?: boolean;
  chat?: Chat | null;
  journey?: Journey;
  prompts?: Prompt[];
  chats?: Chat[];
}

const parseFilters = (filters: AnswersFilters) => {
  let parsedFilters = { ...filters };
  if (parsedFilters?.datasources?.confluence?.spaces) {
    parsedFilters.datasources.confluence.spaceId = parsedFilters.datasources.confluence.spaces.map(
      (space) => space.id
    );
    delete parsedFilters.datasources.confluence.spaces;
  }
  return parsedFilters;
};

export function AnswersProvider({
  appSettings,
  children,
  journey,
  prompts,
  chat,
  chats,
  apiUrl = '/api',
  useStreaming: initialUseStreaming = true
}: AnswersProviderProps) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<Message>>(chat?.messages ?? []);
  const [filters, setFilters] = useState<AnswersFilters>(
    deepmerge({}, appSettings?.filters, journey?.filters, chat?.filters)
  );
  const [showFilters, setShowFilters] = useState(false);
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
    filters: parseFilters(filters),
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
            filters: parseFilters(filters)
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
    const [message] = messages.filter((m) => m.role === 'user').slice(-1);
    // if (messages[messages.length - 1].role === ChatCompletionRequestMessageRoleEnum.Assistant) {
    //   setMessages(messages.slice(0, -1));
    // }
    sendMessage(message);
  };

  const clearMessages = () => {
    setMessages([]);
    setChatId(undefined);
    setError(null);
    setIsLoading(false);
    if (chatId) {
      router.push('/');
    }
  };

  const deleteChat = async (id: string) =>
    axios.delete(`${apiUrl}/chats?id=${id}`).then(() => router.refresh());
  const deletePrompt = async (id: string) =>
    axios.delete(`${apiUrl}/prompts?id=${id}`).then(() => router.refresh());
  const deleteJourney = async (id: string) =>
    axios.delete(`${apiUrl}/journeys?id=${id}`).then(() => router.refresh());
  const updateChat = async (chat: Partial<Chat>) =>
    axios.patch(`${apiUrl}/chats`, chat).then(() => router.refresh());
  const updatePrompt = async (prompt: Partial<Prompt>) =>
    axios.patch(`${apiUrl}/prompts`, prompt).then(() => router.refresh());
  const updateJourney = async (journey: Partial<Journey>) =>
    axios.patch(`${apiUrl}/journeys`, journey).then(() => router.refresh());
  const updateMessage = async (message: Partial<Message>) =>
    axios.patch(`${apiUrl}/messages`, message).then(() => router.refresh());

  const contextValue = {
    appSettings,
    chat,
    chats,
    journey,
    messages,
    prompts,
    sendMessage,
    clearMessages,
    regenerateAnswer,
    filters,
    updateFilter,
    addMessage,
    isLoading,
    useStreaming,
    setUseStreaming,
    error,
    showFilters,
    setShowFilters,
    inputValue,
    setInputValue,
    deleteChat,
    deletePrompt,
    deleteJourney,
    updateChat,
    updatePrompt,
    updateJourney,
    updateMessage
  };
  return <AnswersContext.Provider value={contextValue}>{children}</AnswersContext.Provider>;
}
