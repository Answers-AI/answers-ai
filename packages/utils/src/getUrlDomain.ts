export const getUrlDomain = (url: string) => {
  try {
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `http://${formattedUrl}`;
    }
    const parsedUrl = new URL(formattedUrl);
    const hostname = parsedUrl.hostname.replace(/^www\./i, '');
    return `https://${hostname}`;
  } catch (e) {}
};
