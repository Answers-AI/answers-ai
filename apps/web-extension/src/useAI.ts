import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useCallback } from 'react';
import { useStreamedResponse } from './useStreamedResponse';

const useAI = (options: { useStreaming?: boolean } = {}) => {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState<any[]>([]);
  const [filter, setFilter] = useState({});
  const addAnswer = useCallback(
    (answer: any) => setAnswers((currentAnswers) => [...currentAnswers, answer]),
    []
  );
  const { isLoading, generatedResponse, generateResponse } = useStreamedResponse({
    answers,
    addAnswer
  });
  const [useStreaming, setUseStreaming] = useState(!!options.useStreaming);
  // const scrollRef = React.useRef<HTMLDivElement>(null);
  const { data, isFetching } = useQuery({
    enabled: !!prompt && !useStreaming,
    queryKey: ['completion', prompt],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    cacheTime: 0,
    retry: false,
    queryFn: () =>
      axios
        .post((import.meta.env.VITE_API_URL || 'http://localhost:3000/api') + `/ai/query`, {
          prompt,
          answers,
          filter
        })
        .then((res) => res.data)
        .catch((error) => ({
          error: error?.response?.data?.error
        })),
    onSuccess: (data) => {
      if (answers?.length) addAnswer(data);
    }
  });
  return {
    answers,
    prompt,
    setPrompt,
    filter,
    setFilter,
    isLoading,
    generatedResponse,
    generateResponse,
    data,
    isFetching,
    useStreaming,
    setUseStreaming,
    addAnswer
  };
};

export const syncAi = async (options: { url?: string } = {}) => {
  const { url } = options;
  console.log('syncai', url);
  const response = await axios.post(
    (import.meta.env.VITE_API_URL || 'http://localhost:3000/api') + `/sync/web`,

    url
  );
  console.log('response', response);
  return response.data;
};

export default useAI;
