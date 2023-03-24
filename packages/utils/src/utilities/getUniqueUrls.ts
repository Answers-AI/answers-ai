export const getUniqueUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname.replace(/^www\./i, '');
  const path = parsedUrl.pathname.replace(/\/+$/, ''); // remove trailing slashes
  return `https://${hostname}${path.replace(/\/+/g, '/')}`;
};

export const getUniqueUrls = (urls: string[]) =>
  Array.from(new Set(urls.map((url) => getUniqueUrl(url))));
