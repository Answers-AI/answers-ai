import React, { cache } from 'react';
import { prisma } from '@db/client';
import auth0 from '@utils/auth/auth0';
import * as jose from 'jose';
import { User } from 'types';

import { redirect } from 'next/navigation';
const getCachedSession = cache(async (req?: any, res?: any): Promise<{ user?: User }> => {
  let session = await (req && res ? auth0.getSession(req, res) : auth0.getSession());

  // const checkJwt = jwt({
  //   // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  //   secret: jwksRsa.expressJwtSecret({
  //     cache: true,
  //     rateLimit: true,
  //     jwksRequestsPerMinute: 5,
  //     jwksUri: `https://dev-3od3bmkez06ve724.us.auth0.com/.well-known/jwks.json`
  //   }),

  //   // Validate the audience and the issuer
  //   audience: '{YOUR_API_IDENTIFIER}', //replace with your API's audience, available at Dashboard > APIs
  //   issuer: 'https://dev-3od3bmkez06ve724.us.auth0.com/',
  //   algorithms: ['RS256']
  // });

  if (!session) {
    let token = req ? req.headers.get('authorization')?.split(' ')[1] : '';
    const { headers } = require('next/headers');
    if (!req && headers.get) {
      token = headers.get('authorization')?.split(' ')[1] ?? token;
    }
    if (token) {
      const jwks = jose.createRemoteJWKSet(new URL(process.env.AUTH0_JWKS_URI!));
      const result = await jose.jwtVerify(token.replace('Bearer ', ''), jwks);
      session = { user: result.payload };
    }
  }
  // Redirect to auth0 login
  if (!session) return {};

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
});

export default getCachedSession;
