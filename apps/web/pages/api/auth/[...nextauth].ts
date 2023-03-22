import NextAuth, { AuthOptions, DefaultSession } from 'next-auth';
import { authOptions } from '@ui/authOptions';
export default NextAuth(authOptions);
