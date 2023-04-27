Summary:
This file is responsible for processing web scraping events, extracting content from web pages, and embedding vectors for the extracted content. It interacts with the Inngest API for sending events and Pinecone for embedding vectors. It also uses Cheerio for parsing HTML and Prisma for database operations.

Import statements:
- Various utility functions and types are imported from other modules within the application.
- Cheerio is used for parsing and manipulating HTML content.
- Prisma is used for database operations.

Script Summary:
The script contains several functions for processing web scraping events, extracting content from web pages, splitting the content into smaller chunks, and embedding vectors for the extracted content.

Internal Functions:
- prefixHeaders(markdown: string): string - Adds a prefix to headers in the markdown content.
- splitPageHtmlChunkMore(markdownChunk: string): Promise<string[]> - Splits a markdown chunk into smaller chunks.
- splitPageHtml(iPage: WebPage): Promise<string[]> - Converts a web page's HTML content to markdown and splits it into smaller chunks.
- scrapePage(iUrl: string, origin: string, urls: Set<string>): AsyncGenerator<string | null> - Recursively scrapes a web page and its links.
- getUniqueDomains(urls: string[]): string[] - Returns an array of unique domain URLs from the input URLs.
- getWebPagesVectors(webPages: WebPage[]): Promise<any[]> - Returns an array of vectors for the given web pages.
- embedVectors(event: any, vectors: any[]): Promise<void[]> - Embeds the given vectors using Pinecone.

External Functions:
- processWebUrlScrape: EventVersionHandler<{ urls: string[]; byDomain: boolean }> - Processes a web URL scraping event.
- processWebDomainScrape: EventVersionHandler<{ domain: string }> - Processes a web domain scraping event.
- processWebDeepScrape: EventVersionHandler<{ domain: string }> - Processes a deep web scraping event.
- processWebScrape: EventVersionHandler<{ urls: string[] }> - Processes a web scraping event.

Interaction Summary:
This file interacts with the rest of the application by exporting the external functions mentioned above. These functions are used to handle different types of web scraping events and perform the necessary processing.

Developer Questions:
- How does the RecursiveCharacterTextSplitter work?
- How are the vectors embedded using Pinecone?
- How does the Inngest API work for sending events?

Known Issues and TODOs:
- Validate if the URL exists in the database before processing.
- Verify how long it has been since the URL was last synced.
- Update webData with syncedAt after processing is complete.