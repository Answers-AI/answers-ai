Summary:
This file exports a function called `redisLoader` which returns a `DataLoader` instance that loads data from Redis cache. It also includes an internal function called `primeAll` that primes the cache with new data.

Import statements:
- `DataLoader` from `dataloader`: A utility for batching and caching asynchronous data loading.
- `Redis` and `RedisOptions` from `ioredis`: A Redis client for Node.js.
- `createHash` from `crypto`: A utility for creating hash digests of data.

Script Summary:
This script exports a function called `redisLoader` that returns a `DataLoader` instance. The `DataLoader` instance loads data from Redis cache using a batch loading function called `batchLoadFn`. The `batchLoadFn` function first checks if the requested data is already in the cache. If not, it retrieves the data from a provided `getValuesFn` function and stores it in the cache. The `DataLoader` instance also includes a custom function called `primeAll` that can be used to prime the cache with new data.

Internal Functions:
- `primeAll`: A function that takes in a `DataLoader` instance, a Redis client instance, a hash key function, an array of key-value pairs, and an optional cache expiration time. It stores the key-value pairs in the Redis cache and primes the `DataLoader` instance with the new data.

External Functions:
- `redisLoader`: A function that takes in an object with configuration options and returns a `DataLoader` instance. The configuration options include a Redis key prefix, Redis configuration options, a function to retrieve data for a given set of keys, an optional cache expiration time, and an optional flag to disable caching.

Interaction Summary:
This file interacts with the Redis cache to load and store data. It also interacts with the `dataloader` library to batch and cache data loading.

Developer Questions:
- How does the `batchLoadFn` function work?
- How does the `primeAll` function work?
- How does the cache expiration time work?
- How does the `disableCache` flag work?
- How does the `hashKey` function work?

Known Issues and TODOs:
- None