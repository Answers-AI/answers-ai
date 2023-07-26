const getDomainUrlsFromMarkdown = (markdownString: string, origin: string): string[] => {
  const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;
  const imagePattern = /\.(png|jpg|jpeg|gif|bmp|svg)$/i; // Regular expression to match image file extensions
  const matches = Array.from(markdownString.matchAll(linkPattern));
  const filteredUrls: string[] = [];

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const linkText = match[1];
    const url = match[2];

    const isImageSyntax = /^!\[.*\]\([^)]+\)$/.test(match[0]);
    const hasImageExtension = imagePattern.test(url);

    if (!isImageSyntax && !hasImageExtension && url.startsWith(origin)) {
      filteredUrls.push(url);
    }
  }

  return filteredUrls;
};

export default getDomainUrlsFromMarkdown;
