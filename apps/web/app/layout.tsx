import React from 'react';

export default async function RootLayout({
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ height: '100%', width: '100%', flex: 1, display: 'flex' }}>
      <body style={{ height: '100%', width: '100%', flex: 1, display: 'flex' }}>{children}</body>
    </html>
  );
}
