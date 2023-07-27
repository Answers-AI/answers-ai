import { prisma } from '@db/client';
import { getUrlDomain } from '../getUrlDomain';

const  getPendingSyncURLs = async(urls: string[]) => {
  const normalizedUrls = urls.map((url) => url.toLowerCase());

  await prisma.document.createMany({
    data: normalizedUrls.map((url) => ({
      url,
      domain: getUrlDomain(url),
      source: 'web',
      status: 'pending',
      lastSyncedAt: null
    })),
    skipDuplicates: true
  });

  const pendingSyncDocuments = await prisma.document.findMany({
    where: {
      url: { in: normalizedUrls },
      OR: [
        // 60 minutes have passed since last sync
        { lastSyncedAt: { lte: new Date(Date.now()+ 60 * 60 * 1000) } },
        { status: 'pending' },
        { lastSyncedAt: null }
      ]
    }
  });

  const pendingSyncURLs = pendingSyncDocuments.map((d) => d.url);
  return pendingSyncURLs;
}

export default getPendingSyncURLs;
