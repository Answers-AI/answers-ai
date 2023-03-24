import { prisma } from 'db/dist';

export async function getUrlList({ domains }: { domains?: string[] }) {
  const urlsPromise = await prisma.webDocument.findMany({
    select: {
      url: true
    },
    where: {
      domain: { in: domains }
    }
  });
  return urlsPromise;
}
