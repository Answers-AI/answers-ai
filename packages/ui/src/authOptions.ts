import { AuthOptions, DefaultSession } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import AtlassianProvider from 'next-auth/providers/atlassian';
import SlackProvider from 'next-auth/providers/slack';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from 'db/dist';
import { inngest } from '@utils/ingest/client';
import { User as AnswersUser } from 'types';
export const USER_EVENTS = [
  // 'session',
  'signIn',
  'signOut',
  'createUser',
  'updateUser',
  'linkAccount'
];

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
const ATLASSIAN_SCOPE = {
  // 'write:jira-work': true,
  // 'read:jira-work': true,
  'read:jira-user': true,
  'read:oauth-provider': true,
  'offline_access': true,
  'read:me': true,
  'read:confluence-user': true,
  'read:confluence-space.summary': true,
  'read:confluence-props': true,
  'read:confluence-content.all': true,
  'read:confluence-content.summary': true,
  'read:confluence-groups': true
};
export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          // scope: 'openid email profile channels:read groups:read mpim:read im:read'
          scope: 'openid email profile'
        }
      }
    }),
    AtlassianProvider({
      clientId: process.env.ATLASSIAN_CLIENT_ID!,
      clientSecret: process.env.ATLASSIAN_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: Object.keys(ATLASSIAN_SCOPE).join(' ')
        }
      },
      allowDangerousEmailAccountLinking: true
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true
    })
  ],
  // pages: {
  //   signIn: '/auth/signin'
  // },
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
