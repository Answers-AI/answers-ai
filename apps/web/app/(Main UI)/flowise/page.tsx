import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';
import FlowiseApp from '@ui/FlowiseApp';

export const metadata = {
  title: 'Flowise | Flowise Studio | Answer AI',
  description: 'Flowise Chatflow Builder'
};

const FlowisePage = async ({ params }: any) => {
  const appSettings = await getAppSettings();
  return <FlowiseApp />;
};

export default FlowisePage;
