import React from 'react';
import SidekickFormLayout from '@ui/SidekickFormLayout';

export default async function SidekickUIFormLayout({
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  return (
    // @ts-expect-error
    <SidekickFormLayout>{children}</SidekickFormLayout>
  );
}
