Filepath: packages/utils/src/utilities/getSitemapUrls.ts
Overview: Summary:
This file contains a function that takes a sitemap URL and returns an array of all URLs listed in the sitemap, including those listed in any nested sitemaps. It uses the axios and cheerio libraries to make HTTP requests and parse HTML.

Import statements:
- axios: a library for making HTTP requests
- cheerio: a library for parsing HTML

Script Summary:
The extractUrlsFromSitemap function takes a sitemapUrl string as input and returns a Promise that resolves to an array of strings. It makes an HTTP GET request to the sitemapUrl using axios, then uses cheerio to parse the response HTML and extract all URLs listed in the sitemap. If any of the URLs end with ".xml", it recursively calls itself with that URL to extract URLs from any nested sitemaps.

Internal Functions:
- None

External Functions:
- extractUrlsFromSitemap(sitemapUrl: string): Promise<string[]>
  - Parameters:
    - sitemapUrl: the URL of the sitemap to process
  - Returns:
    - A Promise that resolves to an array of strings representing all URLs listed in the sitemap

Interaction Summary:
This file could be used by other parts of the application that need to extract URLs from sitemaps. For example, it could be used by a web crawler that needs to visit all pages listed in a sitemap.

Developer Questions:
- What format does the sitemap URL need to be in?
- What happens if the sitemap URL is invalid or returns an error?
- How can I test this function to make sure it's working correctly?
- Are there any performance concerns with recursively extracting URLs from nested sitemaps?

