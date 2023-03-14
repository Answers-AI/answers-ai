import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from 'db/dist';
import { inngest } from 'ingestClient';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //     return true
    //   },
    //   async redirect({ url, baseUrl }) {
    //     return baseUrl
    //   },
    async session({ session, user, token }) {
      return session;
    }
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // }
  },
  events: [
    'signIn',
    'signOut',
    'createUser',
    'updateUser',
    'linkAccount'
    // 'session' //TODO: Figure out if necessary, too noisy
  ].reduce(
    (acc, event) => ({
      ...acc,
      [event]: async (payload: any) => {
        inngest.send(`auth/user.${event}`, {
          ts: new Date().valueOf(),
          user: payload.user,
          data: payload
        });
      }
    }),
    {}
  )
};

export default NextAuth(authOptions);
