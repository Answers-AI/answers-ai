import { getServerSession } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AppSettings, AppService } from 'types';

const Auth = ({
  // appSettings,
  onSync
}: {
  // appSettings: AppSettings;
  onSync?: (s: AppService) => void;
}) => {
  // const session = useSession();local
  return (
    <div style={{}}>
      <button color="inherit" onClick={() => signIn()}>
        Sign In
      </button>
    </div>
  );
};
export default Auth;
