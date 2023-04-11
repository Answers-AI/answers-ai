import { AuthOptions, DefaultSession } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from 'db/dist';
import { inngest } from '@utils/ingest/client';
import { User as AnswersUser } from 'types';

// import { USER_EVENTS } from '@utils/ingest/auth';
export const USER_EVENTS = ['signIn', 'signOut', 'createUser', 'updateUser', 'linkAccount'];

declare module 'next-auth' {
  interface User extends AnswersUser {}

  interface Session extends DefaultSession {
    user?: AnswersUser;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}
export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'app-widget',
      name: 'API Key',
      credentials: {
        apiKey: { label: 'API Key', type: 'text' }
      },
      async authorize(credentials, req) {
        let chatApp;
        try {
          const apiKey = credentials?.apiKey;

          if (!apiKey) {
            throw new Error('Missing API Key');
          }

          // Find the ChatApp with the provided apiKey
          chatApp = await prisma.chatApp.findUnique({
            where: { apiKey },
            include: {
              user: true
            }
          });

          if (!chatApp?.user) {
            throw new Error('Invalid API Key');
          }
        } catch (e) {
          console.log(e);
          throw e;
        } finally {
          return chatApp?.user as AnswersUser;
        }

        // Return a user object with the necessary fields
      }
    }),
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
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id!;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
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
