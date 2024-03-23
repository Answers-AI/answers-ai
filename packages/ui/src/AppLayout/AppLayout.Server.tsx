import { Session } from '@auth0/nextjs-auth0';
import AppLayoutClient from './AppLayout.Client';
import { AppSettings } from 'types';
import { Suspense } from 'react';
import ChatDrawerServer from '@ui/ChatDrawer.Server';
import UserInfo from '@ui/UserInfo';

const AppLayoutServer = (props: {
  session?: Session;
  appSettings?: AppSettings;
  // providers: Record<string, ClientSafeProvider> | null;
  children: any;
  params: {
    slug: string;
  };
  flagsmithState: any;
}) => {
  return (
    <AppLayoutClient
      {...props}
      chatList={
        <Suspense fallback="">
          {/* @ts-expect-error Server Component */}
          <ChatDrawerServer />
        </Suspense>
      }
      userInfo={
        <Suspense fallback="">
          {/* @ts-expect-error Server Component */}
          <UserInfo />
        </Suspense>
      }
    />
  );
};

export default AppLayoutServer;
