import React from 'react';
import { prisma } from '@db/client';
import SidekickForm from '@ui/SidekickForm';
import { authOptions } from '@ui/authOptions';
import getCachedSession from '@ui/getCachedSession';
import getUserContextFields from '@utils/utilities/getUserContextFields';
import getOrganizationContextFields from '@utils/utilities/getOrganizationContextFields';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Sidekick Studio | Answers AI',
  description: 'Sidekick Studio'
};

const SidekickFormPage = async ({ params }: any) => {
  const session = await getCachedSession(authOptions);

  if (!session?.user?.email) {
    return redirect('/auth');
  }

  const sidekickId = params.sidekickId;

  const sidekick = await prisma.sidekick
    .findFirst({
      where: {
        id: sidekickId,
        createdByUser: {
          id: session.user.id
        }
      }
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));

  if (!sidekick) {
    return redirect(`/sidekick-studio/${sidekickId}`);
  }

  const uniqueTags = await prisma.sidekick.findMany({
    select: { tags: true },
    where: {
      createdByUser: {
        email: session.user.email
      }
    },
    distinct: ['tags']
  });

  // Flatten and get unique values
  const allTags = Array.from(new Set(uniqueTags.flatMap((dep) => dep.tags)));

  const contextFields = {
    user: getUserContextFields(session.user),
    organization: getOrganizationContextFields(session.user?.currentOrganization),
    result: {
      text: '',
      code: '',
      filePath: '',
      url: ''
    }
  };

  sidekick.sharedWith = sidekick.isGlobal ? 'global' : sidekick.isSharedWithOrg ? 'org' : 'private';

  return (
    <SidekickForm {...params} allTags={allTags} contextFields={contextFields} sidekick={sidekick} />
  );
};

export default SidekickFormPage;
