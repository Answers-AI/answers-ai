import { withAuth } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/((?!api/codebase|api/ai/chat-completion|api/inngest|api/sidekicks/new|_next/static|_next/image|favicon.ico).*)'
  ]
};
export default withAuth({});
