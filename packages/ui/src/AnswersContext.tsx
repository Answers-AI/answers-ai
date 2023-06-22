'use client';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { SetStateAction, createContext, useCallback, useContext, useRef, useState } from 'react';
import { AnswersFilters, AppSettings, Chat, Journey, Message, Prompt, Sidekick } from 'types';
import { deepmerge } from '@utils/deepmerge';
import { useStreamedResponse } from './useStreamedResponse';

interface AnswersContextType {
  appSettings: AppSettings;
  error?: any;
  chat?: Chat | null;
  setChat: (action: SetStateAction<Chat>) => void;
  journey?: Journey | null;
  setJourney: (action: SetStateAction<Journey>) => void;
  messages?: Array<Message>;
  prompts?: Array<Prompt>;
  chats?: Array<Chat>;
  sendMessage: (
    content: string,
    isNewJourney?: boolean,
    sidekick?: Sidekick,
    gptModel?: string
  ) => void;
  clearMessages: () => void;
  regenerateAnswer: () => void;
  isLoading: boolean;
  filters: AnswersFilters;
  setFilters: (filters: SetStateAction<AnswersFilters>) => void;
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
  upsertJourney: (journey: Partial<Journey>) => Promise<void>;

  messageIdx: any;
  setMessages: (arg: SetStateAction<Message[]>) => void;
  journeyId: any;
  chatId: any;
  setIsLoading: any;
  setError: any;
  setChatId: any;
  setJourneyId: any;
}
// @ts-ignore
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
  upsertJourney: async () => {}
});

export function useAnswers({ apiUrl = '/api' }: any = {}) {
  const router = useRouter();
  const context = useContext(AnswersContext);
  const {
    filters,
    setFilters,
    messages,
    useStreaming,
    messageIdx,
    setMessages,
    journeyId,
    chatId,
    setIsLoading,
    setError,
    setChatId,
    setJourneyId
  } = context;

  const addMessage = useCallback(
    (message: Message) => {
      setMessages((currentMessages) => {
        messageIdx.current = currentMessages.length + 1;
        return [...currentMessages, message];
      });
    },
    [messageIdx, setMessages]
  );

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
        if (chunk?.chat) {
          if (chunk.chat?.id !== chatId) {
            setChatId(chunk.chat.id);
          }
          if (chunk.chat?.journeyId !== journeyId) {
            setJourneyId(chunk.chat.journeyId);
          }
        }
        return newMessages;
      });
    },
    onEnd: () => {
      // Check if the current route is the chat
      setIsLoading(false);
    }
  });

  const sendMessage = useCallback(
    async (content: string, sidekick?: Sidekick, gptModel?: string) => {
      const sidekickValue = sidekick?.value || 'defaultPrompt';
      setIsLoading(true);
      setError(null);
      addMessage({ role: 'user', content: content } as Message);
      try {
        if (useStreaming) {
          generateResponse({ content, sidekick, gptModel }); // Pass sidekick and gptModel here
        } else {
          const { data } = await axios.post(`${apiUrl}/ai/query`, {
            journeyId,
            chatId,
            content,
            messages,
            filters,
            sidekickValue,
            gptModel
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
    [
      addMessage,
      useStreaming,
      generateResponse,
      apiUrl,
      journeyId,
      chatId,
      messages,
      filters,
      setChatId,
      setJourneyId,
      setError,
      setIsLoading
    ]
  );

  const updateFilter = (newFilter: AnswersFilters) => {
    const mergedSettings = deepmerge({}, filters, newFilter);

    setFilters(mergedSettings);
  };

  const regenerateAnswer = () => {
    const [message] = messages?.filter((m) => m.role === 'user').slice(-1) ?? [];
    // if (messages[messages.length - 1].role === ChatCompletionRequestMessageRoleEnum.Assistant) {
    //   setMessages(messages.slice(0, -1));
    // }
    sendMessage(message.content);
  };

  const clearMessages = () => {
    setMessages([]);
    setChatId(undefined);
    setError(null);
    setIsLoading(false);
    if (chatId) {
      router.push('/journey/' + journeyId);
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
  const upsertJourney = async (journey: Partial<Journey>) =>
    axios.patch(`${apiUrl}/journeys`, journey);

  const updateMessage = async (message: Partial<Message>) =>
    axios.patch(`${apiUrl}/messages`, message).then(() => router.refresh());

  return {
    ...context,
    sendMessage,
    clearMessages,
    regenerateAnswer,
    updateFilter,
    addMessage,
    deleteChat,
    deletePrompt,
    deleteJourney,
    updateChat,
    updatePrompt,
    upsertJourney,
    updateMessage
  };
}

interface AnswersProviderProps {
  children: React.ReactNode;
  appSettings: AppSettings;
  apiUrl?: string;
  useStreaming?: boolean;
  chat?: Chat;
  journey?: Journey;
  prompts?: Prompt[];
  // chats?: Chat[];
}

export function AnswersProvider({
  chat: initialChat,
  journey: initialJourney,
  appSettings,
  children,
  prompts,
  useStreaming: initialUseStreaming = true
}: AnswersProviderProps) {
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [chat, setChat] = useState<Chat | undefined>(initialChat);
  const [journey, setJourney] = useState<Journey | undefined>(initialJourney);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<Message>>(chat?.messages ?? []);
  const [filters, setFilters] = useState<AnswersFilters>(
    deepmerge({}, appSettings?.filters, journey?.filters, chat?.filters)
  );
  const [showFilters, setShowFilters] = useState(false);
  const [useStreaming, setUseStreaming] = useState(initialUseStreaming);
  const [chatId, setChatId] = useState<string | undefined>(chat?.id);
  const [journeyId, setJourneyId] = useState<string | undefined>(journey?.id);
  const [sidekick, setSidekick] = useState('defaultPrompt');
  const [gptModel, setGptModel] = useState('gpt-3.5-turbo');

  const messageIdx = useRef(0);

  const contextValue = {
    appSettings,
    chat,
    setChat,
    // chats,
    journey,
    messages,
    setJourney,
    setMessages,
    prompts,
    filters,
    setFilters,
    isLoading,
    setIsLoading,
    useStreaming,
    setUseStreaming,
    error,
    setError,
    showFilters,
    setShowFilters,
    inputValue,
    setInputValue,
    chatId,
    setChatId,
    journeyId,
    setJourneyId,
    messageIdx,
    sidekick,
    setSidekick,
    gptModel,
    setGptModel
  };
  // @ts-ignore
  return <AnswersContext.Provider value={contextValue}>{children}</AnswersContext.Provider>;
}
