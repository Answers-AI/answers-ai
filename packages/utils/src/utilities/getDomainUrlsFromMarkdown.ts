const getDomainUrlsFromMarkdown = (markdownString: string, origin: string): string[] => {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const matches = Array.from(markdownString.matchAll(linkPattern));
  const filteredUrls: string[] = [];

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const url = match[2];
    if (url.startsWith(origin)) {
      filteredUrls.push(url);
    }
  }

  return filteredUrls;
}

export default getDomainUrlsFromMarkdown;
