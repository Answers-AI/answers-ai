import Sitemapper from 'sitemapper';

const getSitemapUrls = async(url: string): Promise<string[]> => {
  let sitemapUrls;
  try {
    const SitemapUrls = new Sitemapper({
      url,
      timeout: 10000, // 15 seconds
    });
    
    const { sites } = await SitemapUrls.fetch();
    sitemapUrls = sites;
  } catch (error) {
    console.log(error);
  }

  return sitemapUrls ?? [];
};

export default getSitemapUrls;