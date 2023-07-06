import React from 'react';
import { prisma } from '@db/client';
import OrganizationForm from '@ui/OrganizationForm';
import { authOptions } from '@ui/authOptions';
import { getCachedSession } from '@ui/getCachedSession';

export const metadata = {
  title: 'Organization Studio | Answers AI',
  description: 'Organization Studio'
};

const OrganizationFormPage = async ({ params }: any) => {
  const session = await getCachedSession(authOptions);

  if (!session?.user?.organizationId) return null;

  const organization = await prisma.organization
    .findFirst({
      where: {
        id: session.user.organizationId
      }
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));

  return <OrganizationForm {...params} organization={organization} />;
};

export default OrganizationFormPage;
