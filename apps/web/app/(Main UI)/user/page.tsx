import React from 'react';
import { prisma } from '@db/client';
import UserForm from '@ui/UserForm';
import { authOptions } from '@ui/authOptions';
import { getCachedSession } from '@ui/getCachedSession';

export const metadata = {
  title: 'User Settings | Answers AI',
  description: 'User Settings'
};

const UserFormPage = async ({ params }: any) => {
  const session = await getCachedSession(authOptions);

  if (!session?.user?.id) return null;

  // Only returns the fields we'll be editing
  const user = await prisma.user
    .findFirst({
      where: {
        id: session.user.id
      },
      select: { id: true, contextFields: true }
    })
    .then((data: any) => JSON.parse(JSON.stringify(data)));

  return <UserForm {...params} user={user} />;
};

export default UserFormPage;
