import React from 'react';
import { AnswersProvider } from '@ui/AnswersContext';

export default async function RootLayout({
  // Layouts must accept a children prop.
  params,
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  return <AnswersProvider>{children}</AnswersProvider>;
}
