// app/api/auth/[auth0]/route.js
import { HandlerError, handleAuth } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/navigation';

export const GET = handleAuth({
  onError(req: Request, error: Error) {
    // console.error(error);
    // You can finish the response yourself if you want to customize
    // the status code or redirect the user
    console.error(error);
    return redirect('/auth/error?error=' + error.message);
    // res.end();
  }
});
