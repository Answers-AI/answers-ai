import { prisma } from '@db/client';
import { User } from 'db/generated/prisma-client';

export const respond401 = () => {
  return new Response('Unauthorized', {
    status: 401
  });
};

export const authenticateUser = async (req: Request, res: Response): Promise<User | null> => {
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
