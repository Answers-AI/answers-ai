// pages/api/login.ts
import { NextApiResponse, NextApiRequest } from 'next';
// import { getSession } from 'next-auth/react';

import { getCsrfToken } from 'next-auth/react';
import { init } from '../../../node_modules/next-auth/core/init'; // You have to import it like this
import { createCallbackUrl } from '../../../node_modules/next-auth/core/lib/callback-url';
import { setCookie } from '../../../node_modules/next-auth/next/utils';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
// import { GetServerSidePropsContext } from 'next';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { authOptions } from '@ui/authOptions';

async function getServerSignInUrl(
  req: IncomingMessage,
  cookies: NextApiRequestCookies,
  authOptions: NextAuthOptions
) {
  const { options, cookies: initCookies } = await init({
    action: 'signin',
    authOptions,
    isPost: true,
    cookies,
    csrfToken: await getCsrfToken({ req }),
    callbackUrl: req.url
  });
  console.log('signin options', options);
  console.log('signin initCookies', initCookies);
  const { callbackUrl, callbackUrlCookie } = await createCallbackUrl({
    options
  });
  return {
    redirect: callbackUrl,
    cookies: [...initCookies, callbackUrlCookie]
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const apiKey = req.query.apiKey;
    console.log({ apiKey });

    if (!apiKey) {
      return res.status(400).json({ error: 'Missing API Key' });
    }

    // If a session already exists, return a success message
    const session = await getServerSession(req, res, authOptions);
    console.log({ session });
    if (session) {
      return res.status(200).json({ message: 'User already logged in' });
    }

    const redirect = await getServerSignInUrl(
      req,
      req.cookies,
      authOptions // your authOptions
    );
    console.log({ redirect });
    redirect.cookies?.forEach((cookie) => setCookie(res, cookie));
    res.writeHead(302, { Location: redirect.redirect });
    res.end();

    // Perform a programmatic sign-in using the custom CredentialsProvider
    // const signInResponse = await signIn('api-key', {
    //   redirect: false,
    //   apiKey // Pass the apiKey to the custom provider
    // });

    // if (signInResponse?.error) {
    //   return res.status(401).json({ error: signInResponse.error });
    // }

    // // Set the cookies received from the signIn response
    // const cookies = signInResponse?.headers?.get('set-cookie');
    // res.setHeader('Set-Cookie', cookies);

    // // Redirect the user to the specified callbackUrl or the root path ("/")
    // const callbackUrl = req.query.callbackUrl || '/';
    // return res.redirect(callbackUrl);
  }

  // Return a 405 error for any other request method
  return res.status(405).json({ error: 'Method Not Allowed' });
}
