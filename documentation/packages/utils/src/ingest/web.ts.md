Filepath: packages/utils/src/ingest/web.ts
Overview: Summary:
This file is responsible for scraping web pages, processing the scraped data, and interacting with the Inngest API to send events. It also handles the conversion of web pages to markdown format and the extraction of unique URLs from the provided list of URLs.

Import statements:
- Various utility functions and types are imported from different packages.
- The 'cheerio' library is used for parsing and manipulating HTML.
- The 'url' module is used for working with URLs.
- The 'inngest' client is imported for sending events to the Inngest API.

Script Summary:
The script contains several functions for scraping web pages, processing the scraped data, and interacting with the Inngest API. It also includes functions for converting web pages to markdown format, extracting unique URLs, and splitting the content into smaller chunks.

Internal Functions:
- prefixHeaders(markdown: string): Takes a markdown string and prefixes headers with a specific format. Returns the modified markdown string.
- splitPageHtmlChunkMore(markdownChunk: string): Splits a markdown chunk into smaller chunks based on a specified chunk size. Returns an array of smaller chunks.
- splitPageHtml(iPage: WebPage): Converts a web page to markdown format and splits the content into smaller chunks. Returns an array of markdown chunks.
- scrapePage(iUrl: string, origin: string, urls: Set<string>): Generator function that scrapes a web page and its links, yielding unique URLs.

External Functions:
- processWebUrlScrape: Handles the 'web/urls.sync' event and processes the provided URLs.
- processWebDomainScrape: Handles the 'web/domain.sync' event and processes the provided domain.
- processWebDeepScrape: Handles the 'web/deep.sync' event and processes the provided domain.
- processWebScrape: Handles the 'web/page.sync' event and processes the provided URLs.

Interaction Summary:
This file interacts with the rest of the application by providing functions for scraping web pages, processing the scraped data, and interacting with the Inngest API. It also exports functions that handle specific events related to web scraping, which can be used by other parts of the application.

Developer Questions:
1. How are the scraped web pages stored and managed in the application?
2. How does the Inngest API handle the events sent by this script?
3. Are there any limitations or restrictions on the web pages that can be scraped?
4. How can the performance of the web scraping process be improved?
5. What are the possible error scenarios and how are they handled in the script?

