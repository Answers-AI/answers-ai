import React from 'react';
import DeveloperTools from '../src/DeveloperTools';

const Homepage = async () => {
  const response = await fetch(`http://localhost:3000/api/settings`, {
    cache: 'no-store'
  });
  const settings = await response.json();
  console.log('AppSettings', settings);

  return <DeveloperTools appSettings={settings} />;
};
export const metadata = {
  title: 'Answers AI',
  description: 'Welcome to Answers AI, the last stop for all your questions.'
};

export default Homepage;
