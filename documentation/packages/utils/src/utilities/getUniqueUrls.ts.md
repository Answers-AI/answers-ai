Filepath: packages/utils/src/utilities/getUniqueUrls.ts
Overview: Summary:
This file contains two functions, `getUniqueUrl` and `getUniqueUrls`, which are used to parse and manipulate URLs in order to return unique URLs.

Import statements:
This file does not have any import statements.

Script Summary:
The `getUniqueUrl` function takes a URL string as input, parses it using the `URL` constructor, removes the `www.` from the hostname, removes any trailing slashes from the pathname, and returns a new URL string with a `https://` protocol and any repeated slashes in the path removed.

The `getUniqueUrls` function takes an array of URL strings as input, maps each URL to a unique URL using the `getUniqueUrl` function, removes any duplicates using the `Set` constructor, and returns an array of unique URL strings.

Internal Functions:
- `getUniqueUrl(url: string)`: This function takes a URL string as input and returns a new URL string with a `https://` protocol, the `www.` removed from the hostname, and any repeated slashes in the path removed.

External Functions:
- `getUniqueUrls(urls: string[])`: This function takes an array of URL strings as input, maps each URL to a unique URL using the `getUniqueUrl` function, removes any duplicates using the `Set` constructor, and returns an array of unique URL strings.

Interaction Summary:
This file is used to parse and manipulate URLs in order to return unique URLs. It could potentially be used in any part of the application that requires unique URLs, such as in a web crawler or in a data analysis tool.

Developer Questions:
- What is the expected format of the input URL strings?
- What is the expected format of the output URL strings?
- How are the `getUniqueUrl` and `getUniqueUrls` functions used in the rest of the application?
- Are there any potential edge cases or errors that could occur when using these functions?

