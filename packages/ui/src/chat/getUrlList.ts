import { prisma } from 'db/dist';

const getUrlList = async ({ domains }: { domains?: string[] }) => {
  const urlsPromise = await prisma.webDocument.findMany({
    select: {
      url: true
    },
    where: {
      domain: { in: domains }
    }
  });

  return urlsPromise;
};

export default getUrlList;
