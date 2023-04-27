Summary:
This file contains functions that convert a webpage into markdown format. It uses third-party libraries such as Cheerio, Node-html-markdown, Showdown, and JSDOM.

Import statements:
- webClient from './index': imports a web client module from the index file.
- WebPage from 'types': imports a WebPage interface from a types file.
- cheerio from 'cheerio': imports a fast, flexible, and lean implementation of core jQuery designed specifically for the server.
- NodeHtmlMarkdown from 'node-html-markdown': imports a library that converts HTML to markdown.
- Readability from '@mozilla/readability': imports a library that extracts the main content from a webpage.
- JSDOM from 'jsdom': imports a library that provides a JavaScript implementation of the WHATWG DOM and HTML standards.

Script Summary:
- showDownOptions: an object that contains options for the Showdown library.
- convertMarkdownToHtml: a function that converts markdown to HTML using the Showdown library.
- removeDuplicateHeaders: a function that removes duplicate headers from markdown.
- excludeSelectors: an array of CSS selectors to exclude from the webpage.
- convertWebPageToMarkdown: a function that converts a webpage to markdown format.
- getWebPageHtml: a function that fetches the HTML content of a webpage.

Internal Functions:
- convertMarkdownToHtml(markdown: string, options?: ConverterOptions): string: converts markdown to HTML using the Showdown library. It takes a markdown string and an optional object of options and returns an HTML string.
- removeDuplicateHeaders(markdown: string): string: removes duplicate headers from markdown. It takes a markdown string and returns a markdown string.
- convertWebPageToMarkdown(url: string, pageHtml: string): Promise<WebPage>: converts a webpage to markdown format. It takes a URL string and a string of HTML content and returns a Promise that resolves to a WebPage object.
- getWebPageHtml({ url }: { url: string }): Promise<string>: fetches the HTML content of a webpage. It takes an object with a URL string and returns a Promise that resolves to a string of HTML content.

External Functions:
None

Interaction Summary:
This file interacts with the web client module from the index file to fetch the HTML content of a webpage. It also uses third-party libraries such as Cheerio, Node-html-markdown, Showdown, and JSDOM to manipulate the HTML content and convert it to markdown format.

Developer Questions:
- What are the options for the Showdown library and how do they affect the conversion of markdown to HTML?
- How does the removeDuplicateHeaders function work and why is it necessary?
- What are the CSS selectors in the excludeSelectors array and why are they being excluded from the webpage?
- How does the convertWebPageToMarkdown function use the JSDOM and Readability libraries to extract the main content of a webpage?

Known Issues and TODOs:
None