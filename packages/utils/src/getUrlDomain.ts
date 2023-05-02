export const getUrlDomain = (url: string) => {
  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname.replace(/^www\./i, '');
  return `https://${hostname}`;
};
