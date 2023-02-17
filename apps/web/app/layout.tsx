'use client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

// Create MUI dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2'
    }
  }
});
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <html lang="en" style={{ height: '100%' }}>
          <body style={{ height: '100%' }}>
            {children}
            <ReactQueryDevtools position="top-right" />
          </body>
        </html>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
