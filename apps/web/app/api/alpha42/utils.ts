import { prisma } from '@db/client';

export const respond401 = () => {
  return new Response('Unauthorized', {
    status: 401
  });
};

export const authenticateUser = async (req: Request, res: Response) => {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;

  const apiKey = await prisma.apiKey.findUnique({
    where: {
      key: token
    }
  });
  if (!apiKey) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: apiKey.userId
    }
  });
  if (!user) return null;

  return user;
};
