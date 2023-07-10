'use client';
import { Session } from 'next-auth';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

type AuthFormInputs = {
  email: string;
  password: string;
};
interface AuthProps {
  session?: Session;
  // appSettings: AppSettings;
  providers: Record<string, ClientSafeProvider> | null;
}
const Auth = ({ session, providers }: AuthProps) => {
  const router = useRouter();

  if (session) {
    router.push('/');
    return null;
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'auto',
        width: 'auto'
      }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            {...register('email', { required: true })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            {...register('password', { required: true })}
          />
          {error && <p>{error}</p>}
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form> */}
        <Typography variant="h1">Answers AI</Typography>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2
          }}>
          {Object.values(providers ?? {}).map((provider) => (
            <Button
              key={provider.id}
              variant="contained"
              onClick={() => signIn(provider.id)}
              fullWidth>
              Sign in with {provider.name}
            </Button>
          ))}
        </Box>
        {/* <Box
          sx={{
            width: '100%',
            gap: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gridAutoFlow: 'dense',
            transition: '.3s'
            // ...Object.keys(expanded).reduce(
            //   (accum, key) => ({
            //     ...accum,
            //     [`> *:nth-child(${parseInt(key) + 1})`]: expanded[key]
            //       ? { transition: '.3s', gridColumn: 'span 2' }
            //       : {}
            //   }),
            //   {}
            // )
          }}>
          <IntegrationsSettings appSettings={appSettings} />
        </Box> */}
      </Box>
    </Container>
  );
};

export default Auth;
