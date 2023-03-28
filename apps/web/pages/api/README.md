
# Inngest.ts

Inngest.ts is a JavaScript library for creating and managing events. It provides a set of functions for creating and managing events, as well as a client for sending and receiving events.

## Features

* Create and manage events
* Send and receive events
* Signing key for secure communication
* Functions for authentication, embeddings, messages, web, prompts, JIRA, Slack, OpenAPI, and Confluence

## Usage

To use Inngest.ts, import the library and create a client to send and receive events:

```javascript
import { Inngest } from 'inngest';
import { serve } from 'inngest/next';
import { createInngestFunctions } from '@utils/ingest/EventVersionHandler';
import * as jiraFunctions from '@utils/ingest/jira';
import * as promptFunctions from '@utils/ingest/prompt';
import * as slackFunctions from '@utils/ingest/slack';
import * as embeddingsFunctions from '@utils/ingest/embeddings';
import * as webFunctions from '@utils/ingest/web';
import * as openApiFunctions from '@utils/ingest/openapi';
import * as authFunctions from '@utils/ingest/auth';
import * as messageFunctions from '@utils/ingest/message';
import * as confluenceFunctions from '@utils/ingest/confluence';

// Create a client to send and receive events

const handlers = {
  ...authFunctions,
  ...embeddingsFunctions,
  ...messageFunctions,
  ...webFunctions,
  ...promptFunctions,
  ...jiraFunctions,
  ...slackFunctions,
  ...openApiFunctions,
  ...confluenceFunctions
};

const functions = Object.values(handlers);
type Events = {};
export const inngest = new Inngest<Events>({ name: 'My App' });

const inngestFunctions = createInngestFunctions(functions as any);

export default serve(inngest, inngestFunctions, {
  signingKey: process.env.INNGEST_SIGNING_KEY
});
```

Once the client is created, you can use the functions provided by Inngest.ts to create and manage events.

## Documentation

For more detailed information about Inngest.ts, please refer to the [official documentation](https://inngest.io/docs).
# README.js

README.js is a JavaScript library that enables developers to generate comprehensive README markdown files for their projects. It scans through a given folder and its subdirectories, and creates a README.md file in each folder. It then calls an API endpoint to generate a description of each file in the folder, and appends it to the README.md file.

## Installation

To install README.js, run the following command in your project directory:

```
npm install readme.js
```

## Usage

To use README.js, import the library into your project:

```javascript
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const readme = require('readme.js');
```

Then, call the `processFiles()` function to generate the README.md files:

```javascript
readme.processFiles();
```

The `processFiles()` function will scan through the current directory and its subdirectories, and create a README.md file in each folder. It will then call an API endpoint to generate a description of each file in the folder, and append it to the README.md file.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

# Inngest.ts

Inngest.ts is a JavaScript library that provides a client for sending and receiving events. It is designed to be used in conjunction with other libraries such as `@utils/ingest/EventVersionHandler`, `@utils/ingest/jira`, `@utils/ingest/prompt`, `@utils/ingest/slack`, `@utils/ingest/embeddings`, `@utils/ingest/web`, `@utils/ingest/openapi`, `@utils/ingest/auth`, `@utils/ingest/message`, and `@utils/ingest/confluence`.

The library provides a `Inngest` class that can be used to create a client for sending and receiving events. It also provides a `serve` function that can be used to start the client and configure it with the necessary parameters.

In order to use the library, you must first import the necessary libraries and create an instance of the `Inngest` class. You must then create an object containing the functions that will be used to handle the events. Finally, you must call the `serve` function, passing in the `Inngest` instance and the functions object, along with the signing key.

This library provides a powerful and flexible way to send and receive events in a JavaScript application. It is designed to be used by senior level JavaScript developers, and provides comprehensive documentation to enable developers to understand and use the code effectively.

# README.js

README.js is a JavaScript script that automatically generates a README.md file for a given folder. It scans the folder for files with the extensions `.ts`, `.js`, and `.tsx`, and uses an API endpoint to generate a README.md file containing detailed information about the contents of the folder.

## Requirements

- Node.js
- Axios

## Usage

To use README.js, simply run the script in the folder you wish to generate a README.md file for. The script will loop through each file in the folder, and if it finds a file with the extensions `.ts`, `.js`, or `.tsx`, it will hit the API endpoint with the contents of the file and append the response to the README.md file.

## Notes

- README.js will only generate a README.md file if one does not already exist in the folder.
- The script will pause for two seconds before processing the next file. This can be disabled by commenting out the `await new Promise((resolve) => setTimeout(resolve, 2000));` line.
