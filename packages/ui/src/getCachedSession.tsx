import React, { cache } from 'react';
import { prisma } from '@db/client';
import auth0 from '@utils/auth/auth0';
import * as jose from 'jose';
import { User } from 'types';

const getCachedSession = cache(
  async (req?: any, res: any = new Response()): Promise<{ user: User }> => {
    let session = await (req && res ? auth0.getSession(req, res) : auth0.getSession());

    if (!session) {
      let token = req ? req.headers.get('authorization')?.split(' ')[1] : '';
      if (!req) {
        const { headers } = require('next/headers');
        token = headers?.get('authorization')?.split(' ')[1] ?? token;
      }
      const jwks = jose.createRemoteJWKSet(new URL(process.env.AUTH0_JWKS_URI!));

      const result = await jose.jwtVerify(token.replace('Bearer ', ''), jwks);
      session = { user: result.payload };
    }
    const orgData = {
      organizations: {
        connectOrCreate: {
          where: { id: session.user.org_id },
          create: { id: session.user.org_id, name: session.user.org_name }
        }
      },
      currentOrganization: {
        connectOrCreate: {
          where: { id: session.user.org_id },
          create: { id: session.user.org_id, name: session.user.org_name }
        }
      }
    };
    if (session?.user) {
      const user = await prisma.user.upsert({
        where: {
          email: session.user.email
        },
        create: {
          email: session.user.email,
          name: session.user.name,
          ...orgData
        },
        update: {
          ...orgData
        }
      });
      session.user.id = user.id;
      session.user.organizationId = user.organizationId;
    }
    console.log(
      'Session:',
      session.user.email,
      session.user.organizationId,
      session.user.chatflowDomain
    );
    return session as { user: User };
  }
);

export default getCachedSession;
