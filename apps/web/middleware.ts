import { withAuth } from 'next-auth/middleware';

export const config = {
  matcher: ['/((?!api/alpha42|api/inngest|_next/static|_next/image|favicon.ico).*)']
};
export default withAuth({});
