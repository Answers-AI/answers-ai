import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AppSettings } from 'types';

const fetchAppSettings = async (): Promise<AppSettings> => {
  const response = await fetch('/api/settings');
  const data = await response.json();
  return data;
};

const saveAppSettings = async (data: AppSettings): Promise<AppSettings> => {
  const response = await fetch('/api/settings', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const savedData = await response.json();
  return savedData;
};

const useAppSettings = () => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ['appSettings'],
  //   queryFn: fetchAppSettings
  //   // onSuccess: (fetchedData) => {
  //   //   setLocalSettings(fetchedData);
  //   // }
  // });

  const { mutate } = useMutation(saveAppSettings);

  const updateAppSettings = (newSettings: AppSettings) => {
    mutate(newSettings);
  };

  return { updateAppSettings };
};

export default useAppSettings;
