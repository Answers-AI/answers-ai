const fs = require('fs');
const path = require('path');
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/ai/readme';

async function processFolder(folderPath) {
  // create a README.md file in the folder
  fs.writeFileSync(path.join(folderPath, 'README.md'), '');

  // loop through each file in the folder
  for (const file of fs.readdirSync(folderPath)) {
    const filePath = path.join(folderPath, file);
    // check if file exists and is a file
    if (fs.statSync(filePath).isFile() && ['.ts', '.js', '.tsx'].includes(path.extname(file))) {
      // hit the API endpoint passing in the contents of the file in the request
      const data = {
        file_contents: JSON.stringify(fs.readFileSync(filePath, 'utf8')),
        readme_contents: JSON.stringify(fs.readFileSync(path.join(folderPath, 'README.md'), 'utf8'))
      };
      try {
        const response = await axios.post(BASE_URL, data, {
          headers: { 'Content-Type': 'application/json' }
        });
        // write the response to the README.md file
        fs.writeFileSync(path.join(folderPath, 'README.md'), response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    // check if file exists and is a directory
    else if (fs.statSync(filePath).isDirectory()) {
      await processFolder(filePath); // recursively process subdirectories
    }
  }
}

async function processFiles() {
  await processFolder('.'); // start processing from the current directory
}

processFiles();
