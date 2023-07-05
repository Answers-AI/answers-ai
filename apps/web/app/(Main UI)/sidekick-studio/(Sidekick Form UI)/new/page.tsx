import React from 'react';
import SidekickForm from '@ui/SidekickForm';

export const metadata = {
  title: 'Create Sidekick | Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const SidekickFormPage = async ({ params }: any) => {
  return <SidekickForm {...params} />;
};

export default SidekickFormPage;
