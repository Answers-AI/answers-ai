'use client';
import React, {
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

import { deepmerge } from '@utils/deepmerge';
import { useStreamedResponse } from './useStreamedResponse';
import { clearEmptyValues } from './clearEmptyValues';
import defaultSidekick from '@utils/sidekicks/defaultPrompt';

import {
  AnswersFilters,
  AppSettings,
  Chat,
  Journey,
  Message,
  Prompt,
  Sidekick,
  User,
  MessageFeedback
} from 'types';

interface AnswersContextType {
  user: User;
  appSettings: AppSettings;
  error?: any;
  chat?: Chat | null;
  setChat: (action: SetStateAction<Chat>) => void;
  journey?: Journey | null;
  setJourney: (action: SetStateAction<Journey>) => void;
  messages?: Array<Message>;
  prompts?: Array<Prompt>;
  chats?: Array<Chat>;
  sendMessage: (args: {
    content: string;
    isNewJourney?: boolean;
    sidekick?: Sidekick;
    gptModel?: string;
  }) => void;
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
  updateMessage: (message: Partial<Message>) => Promise<{ data: Message }>;
  updateChat: (chat: Partial<Chat>) => Promise<{ data: Chat }>;
  updatePrompt: (prompt: Partial<Prompt>) => Promise<{ data: Prompt }>;
  upsertJourney: (journey: Partial<Journey>) => Promise<{ data: Journey }>;
  startNewChat: () => void;

  messageIdx: any;
  setMessages: (arg: SetStateAction<Message[]>) => void;
  journeyId: any;
  chatId: any;
  setIsLoading: any;
  setError: any;
  setChatId: any;
  setJourneyId: any;
  setSidekick: (arg: SetStateAction<Sidekick>) => void;
  sidekick?: Sidekick;
  gptModel: string;
  setGptModel: (arg: SetStateAction<string>) => void;
  sendMessageFeedback: (args: Partial<MessageFeedback>) => void;
}
// @ts-ignore
const AnswersContext = createContext<AnswersContextType>({
  appSettings: {},
  error: null,
  messages: [],
  chats: [],
  prompts: [],
  filters: {},
  sidekick: undefined,
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
  startNewChat: async () => {},
  sendMessageFeedback: async () => {}
});

export function useAnswers() {
  const context = useContext(AnswersContext);

  return {
    ...context
  };
}

interface AnswersProviderProps {
  children: React.ReactNode;
  user?: User;
  appSettings: AppSettings;
  apiUrl?: string;
  useStreaming?: boolean;
  chat?: Chat;
  journey?: Journey;
  prompts?: Prompt[];
  // chats?: Chat[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export function AnswersProvider({
  chat: initialChat,
  journey: initialJourney,
  user,
  appSettings,
  children,
  prompts,
  useStreaming: initialUseStreaming = true,
  apiUrl = '/api'
}: AnswersProviderProps) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  // const [chat, setChat] = useState<Chat | undefined>(initialChat);
  const [journey, setJourney] = useState<Journey | undefined>(initialJourney);
  const [isLoading, setIsLoading] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [useStreaming, setUseStreaming] = useState(initialUseStreaming);

  const [journeyId, setJourneyId] = useState<string | undefined>(journey?.id);
  const [sidekick, setSidekick] = useState(defaultSidekick);
  const [gptModel, setGptModel] = useState('gpt-3.5-turbo');
  const messageIdx = useRef(0);

  const { isStreaming, generateResponse } = useStreamedResponse({
    apiUrl,
    onError: (err) => {
      setIsLoading(false);
      setError(err);
    },
    // setChat,
    onChunk: (chunk: Message) => {
      // const idx = messages?.length;
      setMessages((currentMessages) => {
        const newMessages = [...currentMessages];
        newMessages[messageIdx.current] = chunk;
        if (chunk?.chat) {
          if (chunk.chat?.id !== chatId) {
            setChatId(chunk.chat.id);
          }
          if (chunk.chat.journeyId && chunk.chat?.journeyId !== journeyId) {
            setJourneyId(chunk.chat.journeyId);
          }
        }
        return newMessages;
      });
    },
    onEnd: ({ chat: newChat }) => {
      // Check if the current route is the chat
      setIsLoading(false);
      if (newChat) {
        setChatId(newChat?.id);
        history.replaceState(null, '', `/chat/${newChat?.id}`);
      }
    }
  });
  const [chatId, setChatId] = useState<string | undefined>(initialChat?.id);

  const { data: chat } = useSWR<Chat>(
    !isStreaming && chatId ? `${apiUrl}/chats/${chatId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      // refreshInterval: isStreaming ? 0 : 1000,
      fallbackData: initialChat,
      onSuccess(data, key, config) {
        // TODO: re enable once polling is fixed for shared chats
        // setMessages(data.messages!);
      }
    }
  );

  const [messages, setMessages] = useState<Array<Message>>(chat?.messages ?? []);
  const [filters, setFilters] = useState<AnswersFilters>(
    deepmerge({}, appSettings?.filters, journey?.filters, chat?.filters)
  );

  // const setFilters = (filters: SetStateAction<AnswersFilters>) => {
  //   setFiltersState((currentFilters) => {
  //     const newFilters = typeof filters === 'function' ? filters(currentFilters) : filters;
  //     return deepmerge({}, currentFilters, newFilters);
  //   });
  // };
  const addMessage = useCallback(
    (message: Message) => {
      setMessages((currentMessages) => {
        messageIdx.current = currentMessages.length + 1;
        return [...currentMessages, message];
      });
    },
    [messageIdx, setMessages]
  );

  const updateFilter = React.useCallback(
    (newFilter: AnswersFilters) => {
      const mergedSettings = clearEmptyValues(deepmerge({}, filters, newFilter));

      setFilters(mergedSettings);
    },
    [filters]
  );

  const regenerateAnswer = (retry?: boolean) => {
    const [message] = messages?.filter((m) => m.role === 'user').slice(-1) ?? [];
    // if (messages[messages.length - 1].role === ChatCompletionRequestMessageRoleEnum.Assistant) {
    //   setMessages(messages.slice(0, -1));
    // }
    sendMessage({ content: message.content, retry, sidekick, gptModel });
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

  const sendMessageFeedback = async (data: Partial<MessageFeedback>) =>
    axios.post(`${apiUrl}/chats/message_feedback`, data).then(() => router.refresh());

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

  const startNewChat = () => {
    if (journey) {
      router.push(`/journey/${journey.id}`);
      setJourneyId(journey.id);
    } else {
      router.push('/chat');
      setJourneyId(undefined);
    }
    setChatId(undefined);
    setMessages([]);
    setFilters({});
  };
  const sendMessage = useCallback(
    async ({
      content,
      sidekick,
      gptModel,
      retry
    }: {
      content: string;
      sidekick?: Sidekick;
      gptModel?: string;
      retry?: boolean;
    }) => {
      const sidekickValue = sidekick?.id || 'defaultPrompt';
      setIsLoading(true);
      setError(null);
      if (!retry) addMessage({ role: 'user', content: content } as Message);
      try {
        if (useStreaming) {
          await generateResponse({
            content,
            sidekick,
            gptModel,
            chatId,
            journeyId,
            messages,
            filters
          }); // Pass sidekick and gptModel here
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

  React.useEffect(() => {
    setJourney(initialJourney);
    setFilters(deepmerge({}, initialJourney?.filters, initialChat?.filters));
  }, [initialChat, initialJourney, appSettings]);

  const contextValue = {
    user,
    appSettings,
    chat,
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
    setGptModel,
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
    updateMessage,
    startNewChat,
    sendMessageFeedback
  };
  // @ts-ignore
  return <AnswersContext.Provider value={contextValue}>{children}</AnswersContext.Provider>;
}
