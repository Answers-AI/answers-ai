Filepath: packages/utils/src/web/getWebPage.ts
Overview: Summary:
This file contains functions for fetching and converting web pages to markdown format. It imports dependencies such as cheerio, node-html-markdown, and @mozilla/readability to perform these tasks.

Import statements:
- webClient: an external module for fetching web data
- WebPage: a custom type for representing web pages
- cheerio: a library for parsing and manipulating HTML
- NodeHtmlMarkdown: a library for converting HTML to markdown
- Readability: a library for extracting article content from HTML
- JSDOM: a library for creating a virtual DOM for HTML manipulation
- showdown: a library for converting markdown to HTML

Script Summary:
- Defines a set of options for the showdown library
- Defines a function for converting markdown to HTML
- Defines a function for removing duplicate headers in markdown
- Defines an array of selectors to exclude from the web page
- Defines a function for converting a web page to markdown format
- Defines a function for fetching the HTML of a web page

Internal Functions:
- convertMarkdownToHtml(markdown: string, options?: ConverterOptions): string
  - Converts markdown to HTML using the showdown library
- removeDuplicateHeaders(markdown: string): string
  - Removes duplicate headers from markdown
- convertWebPageToMarkdown(url: string, pageHtml: string): Promise<WebPage>
  - Converts a web page to markdown format
  - Returns a Promise that resolves to a WebPage object
- getWebPageHtml({ url }: { url: string }): Promise<string>
  - Fetches the HTML of a web page
  - Returns a Promise that resolves to a string of HTML

External Functions:
- None

Interaction Summary:
This file interacts with the webClient module to fetch web data. It also interacts with the types module to use the WebPage type. The functions defined in this file could be used by other parts of the application to fetch and convert web pages.

Developer Questions:
- What is the purpose of the excludeSelectors array?
- How does the convertWebPageToMarkdown function handle errors?
- What is the purpose of the JSDOM library in the convertWebPageToMarkdown function?
- How does the getWebPageHtml function handle caching?

