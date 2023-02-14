const fs = require("fs");

class SessionData {
  constructor(config) {
    this.vectors = [];
    Object.assign(this, config);
  }

  addVectors(vectors) {
    if (Array.isArray(vectors)) {
      this.vectors.push(...vectors);
    } else {
      this.vectors.push(vectors);
    }
  }

  replaceVectors(vectors) {
    if (Array.isArray(vectors)) {
      this.vectors = vectors;
    } else {
      this.vectors = [vectors];
    }
  }

  clearVectors() {
    this.vectors = [];
  }

  writeVectorsToFile() {
    const maxFileSize = 1.8 * 1024 * 1024; // 1.5MB in bytes

    let currentFileSize = 0;
    let currentFileIndex = 0;
    let currentFileArray = [];

    const currentDate = new Date().toISOString().slice(0, 19).replace(/T/, " ");

    const folderPath = `output/${this.namespace}/${currentDate}`;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const outputFileName = `${folderPath}/${Date.now()}`;
    const namespace = this.namespace;
    this.vectors.forEach(function (element) {
      let jsonString = JSON.stringify(element);
      let jsonStringSize = Buffer.byteLength(jsonString, "utf8");
      if (currentFileSize + jsonStringSize > maxFileSize) {
        fs.writeFileSync(
          `${outputFileName}-${currentFileIndex}.json`,
          JSON.stringify({
            namespace,
            vectors: currentFileArray,
          })
        );
        currentFileIndex++;
        currentFileArray = [];
        currentFileSize = 0;
      }
      currentFileArray.push(element);
      currentFileSize += jsonStringSize;
    });

    fs.writeFileSync(
      `${outputFileName}-${currentFileIndex}.json`,
      JSON.stringify({ namespace, vectors: currentFileArray })
    );
  }
}

module.exports = SessionData;
