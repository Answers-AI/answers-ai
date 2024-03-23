export const config = {
  matcher: [
    '/((?!api/codebase|api/ai/chat-completion|api/inngest|api/sidekicks/new|_next/static|_next/image|favicon.ico).*)'
  ]
};

import { NextResponse } from 'next/server';

// export default auth0.withMiddlewareAuthRequired();
export default async function middleware() {
  const res = NextResponse.next();
  // const user = await auth0.getSession(req, res);
  // res.cookies.set('hl', user?.language);
  return res;
}
