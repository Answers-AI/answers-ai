import NextAuth, { AuthOptions, DefaultSession } from 'next-auth';
import { authOptions } from '@web/authOptions';
export default NextAuth(authOptions);
