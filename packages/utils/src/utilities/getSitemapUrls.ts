import axios from 'axios';
import cheerio from 'cheerio';

/**
 * Given a sitemap URL, returns an array of all URLs listed in the sitemap
 * including those listed in any nested sitemaps.
 * @param sitemapUrl The URL of the sitemap to process.
 * @returns An array of all URLs listed in the sitemap.
 */
export async function extractUrlsFromSitemap(sitemapUrl: string): Promise<string[]> {
  try {
    const { data } = await axios.get(sitemapUrl);

    const $ = cheerio.load(data.toString());
    const sitemapUrls: string[] = [];
    const locs = $('loc');

    for (let i = 0; i < locs.length; i++) {
      const loc = locs[i];
      const url = $(loc).text().trim();

      if (url.endsWith('.xml')) {
        const nestedSitemapUrls = await extractUrlsFromSitemap(url);
        sitemapUrls.push(...nestedSitemapUrls);
      } else {
        sitemapUrls.push(url);
      }
    }

    return sitemapUrls;
  } catch (err: any) {
    console.log(`Error extractUrlsFromSitemap on url ${sitemapUrl}.  Message: err?.message`);
    return [];
  }
}
