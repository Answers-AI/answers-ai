const chunkArray = (array, chunkSize) => {
  return Array.from({ length: Math.ceil(array.length / chunkSize) }, (v, i) => {
    return array.slice(i * chunkSize, i * chunkSize + chunkSize);
  });
};

module.exports = {
  chunkArray,
};
