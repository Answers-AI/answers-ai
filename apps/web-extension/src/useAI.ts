import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useCallback } from 'react';
import { useStreamedResponse } from './useStreamedResponse';

const useAI = (options: { useStreaming?: boolean } = {}) => {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState<any[]>([]);
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
          answers
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

export default useAI;
