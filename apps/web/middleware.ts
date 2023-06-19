import { withAuth } from 'next-auth/middleware';

export const config = { matcher: ['/:path*'] };
export default withAuth({});
