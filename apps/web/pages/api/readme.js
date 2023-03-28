const fs = require('fs');
const path = require('path');
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/ai/readme';

async function processFolder(folderPath) {
  // create a README.md file in the folder if it doesn't exist
  const readmePath = path.join(folderPath, 'README.md');
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, '');
  }

  let currentReadMe = '';
  // loop through each file in the folder
  for (const file of fs.readdirSync(folderPath)) {
    const filePath = path.join(folderPath, file);
    // check if file exists and is a file
    if (
      !filePath.toLowerCase().indexOf('readme') > -1 &&
      !filePath.toLowerCase().indexOf('node_modules') > -1 &&
      fs.statSync(filePath).isFile() &&
      ['.ts', '.js', '.tsx'].includes(path.extname(file))
    ) {
      // hit the API endpoint passing in the contents of the file in the request
      currentReadMe = fs.readFileSync(readmePath, 'utf8');
      const data = {
        file_path: filePath,
        file_contents: JSON.stringify(fs.readFileSync(filePath, 'utf8')),
        readme_contents: JSON.stringify(currentReadMe)
      };
      try {
        const response = await axios.post(BASE_URL, data, {
          headers: { 'Content-Type': 'application/json' }
        });
        // append the response to the README.md file
        fs.appendFileSync(readmePath, `${response.data.data}\n`);
        // pause for 2 seconds before processing the next file
        // await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        // throw an error with the message from the Axios response
        throw new Error(error.response.data.message);
      }
    }
    // check if file exists and is a directory
    else if (fs.statSync(filePath).isDirectory()) {
      await processFolder(filePath); // recursively process subdirectories
    }
  }
}

async function processFiles() {
  try {
    await processFolder('.'); // start processing from the current directory
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

processFiles();
