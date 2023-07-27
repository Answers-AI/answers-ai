const getDomainUrlsFromMarkdown = (markdownString: string, origin: string): string[] => {
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = markdownString.matchAll(linkPattern);
    const filteredUrls: string[] = [];
  
    for (const match of matches) {
      const url = match[2];
      if (url.startsWith(origin)) {
        filteredUrls.push(url);
      }
    }
  
    return filteredUrls;
  }

  export default getDomainUrlsFromMarkdown;