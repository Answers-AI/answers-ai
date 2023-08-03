const fs = require('fs');
const path = require('path');

const processedFiles = new Set();
const extractedTypes = new Set();

const blockedePathSegments = [
  'node_modules',
  'dist',
  'generated',
  '.next',
  'cypress/support',
  'runtime'
];

function grep(folderPath, regex) {
  const fileNames = fs.readdirSync(folderPath);

  for (const fileName of fileNames) {
    const filePath = path.join(folderPath, fileName);

    if (fs.statSync(filePath).isDirectory()) {
      // Recursively call grep function for subfolders
      if (!blockedePathSegments.some((p) => filePath.includes(p))) {
        grep(filePath, regex);
      }
    } else {
      if (
        !blockedePathSegments.some((p) => filePath.includes(p)) &&
        !processedFiles.has(filePath) &&
        (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.d.ts'))
      ) {
        const content = fs.readFileSync(filePath, 'utf8');
        const matches = Array.from(content.matchAll(regex));

        if (matches.length > 0) {
          processedFiles.add(filePath);
          const fileHeader = ''; //`Source: ${filePath}\n`;

          for (const match of matches) {
            const [, firstPart, name, body] = match;
            const strippedMatch = `${firstPart} ${name}{ ${body.replace(/\s+/g, '').trim()} }\n`;
            extractedTypes.add(fileHeader + strippedMatch);
          }
        }
      }
    }
  }
}

// Usage example:
const folderPath = './';
const regex = /(?:(interface|type))\s*(\w+)[\s=]*\{([^}]*)\}/g;

// Clear the contents of the output file before starting
fs.writeFileSync('types.txt', '');

grep(folderPath, regex);

// Write the extracted types to the output file
fs.appendFileSync('types.txt', Array.from(extractedTypes).join('\n'));
