import DataLoader from 'dataloader';
import Redis from 'ioredis';
import { createHash } from 'crypto';

const primeAll = async <K, V>(
  loader: DataLoader<K, V, K>,
  redis: Redis,
  hashKey: any,
  keyValues: Array<[K, V]>,
  cacheExpirationInSeconds?: number
) => {
  await redis.mset(...keyValues.flatMap(([key, value]) => [hashKey(key), JSON.stringify(value)]));
  // Set the expiration time for the cache key
  if (cacheExpirationInSeconds)
    await Promise.all(
      keyValues.map(async ([key]) => redis.expire(hashKey(key), cacheExpirationInSeconds))
    );

  await Promise.all(
    keyValues?.map(([key, value]) => {
      loader.prime(key, value);
    })
  );
};

const redisLoader = <K, V>({
  keyPrefix,
  redisConfig,
  getValuesFn,
  cacheExpirationInSeconds,
  disableCache
}: {
  keyPrefix: string;
  redisConfig: string;
  getValuesFn: (keys: readonly K[] | K[]) => Promise<(V | null)[]>;
  cacheExpirationInSeconds?: number;
  disableCache?: boolean;
}) => {
  const redis = new Redis(redisConfig);

  const hashKey = (key: K) =>
    `v1:${keyPrefix || 'default'}:redisLoader:` +
    createHash('sha1').update(JSON.stringify(key)).digest('base64');

  const batchLoadFn = async (cacheKeys: readonly K[]) => {
    if (disableCache) return getValuesFn(cacheKeys);

    const cacheKeyStrings = cacheKeys.map(hashKey);
    const cacheKeyStringLength = cacheKeyStrings?.length;

    let cachedValues: (string | null)[] = [];
    const timerName = `Loading ${cacheKeyStringLength} items from redis @ ${Date.now()}`;
    try {
      console.time(timerName);
      cachedValues = await redis.mget(...cacheKeyStrings);
    } catch (err) {
      console.log('[Error in redisLoader] ', err);
      return cacheKeyStrings?.map(() => null);
    } finally {
      console.timeEnd(timerName);
    }

    const cacheMissKeys: K[] = [];
    const results: (V | null)[] = [];

    for (let i = 0; i < cacheKeys.length; i++) {
      const cacheKey = cacheKeys[i];
      const cachedValue = cachedValues[i];

      if (cachedValue) {
        try {
          const parsedValue = JSON.parse(cachedValue);
          results.push(parsedValue);
        } catch (err) {
          cacheMissKeys.push(cacheKey);
          results.push(null);
          console.log('Error parsing cached value', {
            cacheKey: hashKey(cacheKey),
            cachedValue
          });
        }
      } else {
        cacheMissKeys.push(cacheKey);
        results.push(null);
      }
    }

    if (cacheMissKeys.length > 0) {
      console.log(
        `[redisLoader] Cache miss: { cacheMissKey: ${hashKey(cacheMissKeys[0])}, count: ${
          cacheMissKeys.length
        } }`
      );

      const nonCachedValues = await getValuesFn(cacheMissKeys);

      const nonCachedKeyValues: [K, V | null][] = nonCachedValues.map((value, index) => [
        cacheMissKeys[index],
        value
      ]);

      await redis.mset(
        ...nonCachedKeyValues.flatMap(([key, value]) => [hashKey(key), JSON.stringify(value)])
      );

      // Set the expiration time for the cache key
      if (cacheExpirationInSeconds)
        await Promise.all(
          nonCachedKeyValues.map(async ([key]) =>
            redis.expire(hashKey(key), cacheExpirationInSeconds)
          )
        );

      nonCachedValues.forEach((value, index) => {
        results[cacheMissKeys.indexOf(cacheMissKeys[index])] = value;
      });
    }

    return results;
  };

  const loader = new DataLoader(batchLoadFn, { maxBatchSize: 100 });
  // @ts-ignore
  loader.primeAll = (keyValues: Array<[K, V]>) =>
    // @ts-ignore
    primeAll<K, V>(loader, redis, hashKey, keyValues, cacheExpirationInSeconds);

  return loader;
};

export default redisLoader;
