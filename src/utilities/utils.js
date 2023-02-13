/**
 * Recursively remove keys with null values from an object.
 * Also handles accepting undefined to prevent repeating this logic at each call site.
 */
const removeNullValuesFromObject = (obj) => {
  if (obj === undefined) return undefined;
  for (const key in obj) {
    const value = obj[key];
    if (value === null) delete obj[key];
    else if (typeof value == "object") removeNullValuesFromObject(value);
  }
  return obj;
};

/**
 * This remove null values from the metadata and filter properties of the given
 * object. This makes it easier to work with Pinecones lack of support for null.
 */
const removeNullValues = (obj) => {
  if (obj === undefined) return undefined;
  const { metadata, filter, setMetadata, ...rest } = obj;
  return {
    filter: removeNullValuesFromObject(filter),
    metadata: removeNullValuesFromObject(metadata),
    setMetadata: removeNullValuesFromObject(setMetadata),
    ...rest,
  };
};

const chunkArray = (array, chunkSize) => {
  return Array.from({ length: Math.ceil(array.length / chunkSize) }, (v, i) => {
    return array.slice(i * chunkSize, i * chunkSize + chunkSize);
  });
};

module.exports = {
  removeNullValuesFromObject,
  removeNullValues,
  chunkArray,
};
