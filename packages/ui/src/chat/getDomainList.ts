import { prisma } from 'db/dist';

export async function getDomainList() {
  const domainsPromise = await prisma.webDocument.findMany({
    select: {
      domain: true
    },
    distinct: ['domain']
  });
  return domainsPromise;
}
