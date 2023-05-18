import { prisma } from 'db/dist';
import { getUrlDomain } from '../getUrlDomain';

export async function getPendingSyncURLs(urls: string[]) {
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
        { lastSyncedAt: { lte: new Date(Date.now() - 60 * 60 * 1000) } },
        { status: 'pending' },
        { lastSyncedAt: null }
      ]
    }
  });
  const pendingSyncURls = pendingSyncDocuments.map((d) => d.url);
  return pendingSyncURls;
}
