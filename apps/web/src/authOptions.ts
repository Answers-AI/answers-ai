import { AuthOptions, DefaultSession } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from 'db/dist';
import { inngest } from 'utils/dist/ingest/client';
import { User as AnswersUser } from 'types';
// import { USER_EVENTS } from 'utils/dist/ingest/auth';
export const USER_EVENTS = ['signIn', 'signOut', 'createUser', 'updateUser', 'linkAccount'];

declare module 'next-auth' {
  interface User extends AnswersUser {}

  interface Session extends DefaultSession {
    user?: AnswersUser;
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
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
  events: USER_EVENTS.reduce(
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
