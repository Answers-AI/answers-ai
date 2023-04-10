import React from 'react';

export default async function RootLayout({
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
