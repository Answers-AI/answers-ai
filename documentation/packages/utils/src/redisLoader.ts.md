Filepath: packages/utils/src/redisLoader.ts
Overview: Summary:
redisLoader.ts is a module that exports a function that returns a DataLoader instance that can be used to load data from Redis cache. The module uses ioredis and crypto libraries to interact with Redis cache and hash keys respectively.

Import statements:
- DataLoader: a library for batching and caching data requests
- Redis: a Redis client for Node.js
- createHash: a function from the crypto library for creating hash digests

Script Summary:
The script exports a function called redisLoader that takes in an object with keyPrefix, redisConfig, getValuesFn, cacheExpirationInSeconds, and disableCache properties. The function returns a DataLoader instance that can be used to load data from Redis cache. The redisLoader function uses ioredis and crypto libraries to interact with Redis cache and hash keys respectively.

Internal Functions:
- primeAll: a function that takes in a DataLoader instance, Redis client, hashKey function, an array of key-value pairs, and an optional cache expiration time. The function sets the key-value pairs in Redis cache, sets the cache expiration time if provided, and primes the DataLoader instance with the key-value pairs.

External Functions:
- redisLoader: a function that takes in an object with keyPrefix, redisConfig, getValuesFn, cacheExpirationInSeconds, and disableCache properties. The function returns a DataLoader instance that can be used to load data from Redis cache. The DataLoader instance is primed with data from Redis cache if available, otherwise it fetches the data using the getValuesFn function and stores it in Redis cache.

Interaction Summary:
redisLoader.ts interacts with Redis cache to load and store data. It can be used in conjunction with other modules that require data loading and caching.

Developer Questions:
- What is the purpose of the DataLoader library and how does it work?
- What is the purpose of the ioredis library and how does it interact with Redis cache?
- What is the purpose of the createHash function and how is it used to create hash keys?
- How does the redisLoader function work and what are its required properties?
- How does the primeAll function work and when is it called?
- How does the DataLoader instance interact with Redis cache and the getValuesFn function?
- How can the cacheExpirationInSeconds and disableCache properties be used to control caching behavior?

