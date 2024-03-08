import { Session } from '@auth0/nextjs-auth0';
import AppLayoutClient from './AppLayout.Client';
import { AppSettings } from 'types';

const AppLayoutServer = (props: {
  session?: Session;
  appSettings: AppSettings;
  // providers: Record<string, ClientSafeProvider> | null;
  children: any;
  params: {
    slug: string;
  };
  flagsmithState: any;
}) => {
  return <AppLayoutClient {...props} />;
};

export default AppLayoutServer;
