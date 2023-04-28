import { prisma } from 'db/dist';

export async function getFullUrlList() {
  const urlsPromise = await prisma.webDocument.findMany({
    select: {
      url: true,
      domain: true,
      id: true
    }
  });
  return urlsPromise;
}
