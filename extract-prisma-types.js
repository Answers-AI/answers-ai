const fs = require('fs');

const schema = fs.readFileSync('packages/db/prisma/schema.prisma', 'utf-8');

// Handle model conversion
const modelRegex = /model (\w+) {([^}]+)}/g;

let match;
let output = '';

while ((match = modelRegex.exec(schema))) {
  const modelName = match[1];
  const modelContent = match[2];

  output += `interface ${modelName} {\n`;

  const fieldRegex = /^\s*(\w+)\s+(\w+)/gm;
  let fieldMatch;

  while ((fieldMatch = fieldRegex.exec(modelContent))) {
    const fieldName = fieldMatch[1];
    const fieldType = fieldMatch[2];
    let tsType = '';

    switch (fieldType) {
      case 'Int':
      case 'Decimal':
      case 'Float':
        tsType = 'number';
        break;
      case 'String':
        tsType = 'string';
        break;
      case 'Boolean':
        tsType = 'boolean';
        break;
      case 'DateTime':
        tsType = 'Date';
        break;
      case 'Json':
        tsType = 'any';
        break;

      default:
        tsType = fieldType;
    }

    output += `  ${fieldName}: ${tsType};\n`;
  }

  output += '}\n\n';
}

// Handle enum conversion
const enumRegex = /enum (\w+) {([^}]+)}/g;

while ((match = enumRegex.exec(schema))) {
  const enumName = match[1];
  const enumContent = match[2];

  output += `enum ${enumName} {\n`;

  const enumValues = enumContent.split(/\s+/).filter(Boolean);

  for (const value of enumValues) {
    output += `  ${value} = '${value}',\n`;
  }

  output += '}\n\n';
}

fs.writeFileSync('interfaces.ts', output);
