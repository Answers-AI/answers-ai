Filepath: packages/utils/src/web/client.ts
Overview: Summary:
This file contains a class called WebClient that is responsible for fetching web data from a given URL. It has a cache feature that stores data in Redis to improve performance.

Import statements:
The file imports axios and AxiosError from the axios library, and Redis from the ioredis library.

Script Summary:
The WebClient class has a constructor that initializes the cacheExpireTime, redis, and headers properties. It also has a fetchWebData function that takes a URL and an optional cache parameter. If cache is true, the function checks if the data is already stored in Redis. If it is, it returns the cached data. If not, it makes a GET request to the URL using axios and stores the response data in Redis if cache is true.

Internal Functions:
- None

External Functions:
- fetchWebData(url: string, { cache = true }: { cache?: boolean } = {}): This function takes a URL and an optional cache parameter. It returns the data fetched from the URL, either from the cache or by making a GET request to the URL.

Interaction Summary:
This file interacts with Redis to store and retrieve cached data. It also interacts with the axios library to make GET requests to URLs.

Developer Questions:
- How is the cacheExpireTime determined?
- What is the purpose of the headers property?
- How does the fetchWebData function handle HTTP requests with a status of 429?
- What is the format of the data stored in Redis?
- How can the Redis connection be configured?

