import { prisma } from '@db/client';
import { User } from 'db/generated/prisma-client';

export const authenticateUser = async (req: Request): Promise<User | null> => {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;

  const apiKey = await prisma.apiKey.findUnique({
    where: {
      key: token
    },
    include: {
      user: true
    }
  });
  if (!apiKey?.user) return null;

  return apiKey.user;
};
