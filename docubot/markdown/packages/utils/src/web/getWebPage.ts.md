Summary:
This file contains functions for fetching and converting web pages to markdown. It uses third-party libraries like Cheerio, NodeHtmlMarkdown, Readability, JSDOM, and Showdown.

Import statements:
- webClient: a module for fetching web data
- WebPage: a type for representing a web page
- cheerio: a library for parsing and manipulating HTML
- NodeHtmlMarkdown: a library for converting HTML to markdown
- Readability: a library for extracting article content from web pages
- JSDOM: a library for parsing and manipulating HTML in a Node.js environment
- showdown: a library for converting markdown to HTML

Script Summary:
- showDownOptions: an object containing options for the Showdown library
- convertMarkdownToHtml: a function that converts markdown to HTML using the Showdown library
- removeDuplicateHeaders: a function that removes duplicate headers from markdown
- excludeSelectors: an array of CSS selectors to exclude from the web page
- convertWebPageToMarkdown: a function that fetches a web page, removes excluded elements, converts it to markdown, and extracts article content using the Readability library
- getWebPageHtml: a function that fetches the HTML of a web page using the webClient module

Internal Functions:
- convertMarkdownToHtml(markdown: string, options?: ConverterOptions): string
  - Parameters: 
    - markdown: a string containing markdown
    - options: an optional object containing options for the Showdown library
  - Returns: a string containing HTML
  - Description: This function converts markdown to HTML using the Showdown library.

- removeDuplicateHeaders(markdown: string): string
  - Parameters: 
    - markdown: a string containing markdown
  - Returns: a string containing markdown
  - Description: This function removes duplicate headers from markdown.

External Functions:
- convertWebPageToMarkdown(url: string, pageHtml: string): Promise<WebPage>
  - Parameters: 
    - url: a string containing the URL of the web page
    - pageHtml: a string containing the HTML of the web page
  - Returns: a Promise that resolves to a WebPage object
  - Description: This function fetches a web page, removes excluded elements, converts it to markdown, and extracts article content using the Readability library.

- getWebPageHtml({ url }: { url: string }): Promise<string>
  - Parameters: 
    - url: a string containing the URL of the web page
  - Returns: a Promise that resolves to a string containing the HTML of the web page
  - Description: This function fetches the HTML of a web page using the webClient module.

Interaction Summary:
This file interacts with the webClient module to fetch web data. It also uses third-party libraries like Cheerio, NodeHtmlMarkdown, Readability, JSDOM, and Showdown to parse, manipulate, and convert HTML and markdown. The convertWebPageToMarkdown function returns a WebPage object, which could be used by other parts of the application to display or store web page content.

Developer Questions:
- What are the options for the Showdown library and how do they affect the conversion of markdown to HTML?
- How does the removeDuplicateHeaders function work and why is it necessary?
- What CSS selectors are excluded from the web page and why?
- How does the Readability library extract article content from web pages?
- How does the JSDOM library parse and manipulate HTML in a Node.js environment?