import React from 'react';
import FlowiseLayout from '@ui/FlowiseLayout';

export default async function SidekickUIFormLayout({
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  return (
    // @ts-expect-error
    <FlowiseLayout>{children}</FlowiseLayout>
  );
}
