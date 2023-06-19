import { Session } from 'next-auth';
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
