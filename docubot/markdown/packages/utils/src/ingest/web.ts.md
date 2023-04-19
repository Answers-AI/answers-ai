Summary:
This file is responsible for web scraping and processing web pages, converting them to markdown format, and embedding vectors for the scraped content. It exports several event handlers for different types of web scraping tasks, such as processing web URLs, domains, and deep scraping.

Import statements:
- Various utility functions and types are imported from other modules within the application.
- The 'cheerio' library is used for parsing and manipulating HTML content.
- The 'URL' class is imported from the 'url' module for handling URLs.

Script Summary:
The script contains several internal functions for processing web pages, such as prefixing headers, splitting HTML content, and scraping pages. It also exports event handlers for processing web URLs, domains, and deep scraping, as well as a handler for processing web pages and embedding vectors.

Internal Functions:
- prefixHeaders(markdown: string): Takes a markdown string, processes the headers, and returns the modified markdown string.
- splitPageHtmlChunkMore(markdownChunk: string): Splits a markdown chunk into smaller chunks based on a specified chunk size.
- splitPageHtml(iPage: WebPage): Converts a web page to markdown format and splits it into chunks.
- scrapePage(iUrl: string, origin: string, urls: Set<string>): An async generator function that scrapes a web page and yields unique URLs found on the page.

External Functions:
- processWebUrlScrape: Event handler for processing web URLs.
- processWebDomainScrape: Event handler for processing web domains.
- processWebDeepScrape: Event handler for deep web scraping.
- processWebScrape: Event handler for processing web pages and embedding vectors.

Interaction Summary:
This file interacts with other parts of the application by providing event handlers for different types of web scraping tasks. It also uses utility functions and types from other modules within the application.

Developer Questions:
- How are the event handlers registered and triggered within the application?
- What is the expected format of the input data for each event handler?
- How are errors handled within the event handlers and internal functions?
- Are there any performance considerations or limitations when processing large numbers of URLs or web pages?