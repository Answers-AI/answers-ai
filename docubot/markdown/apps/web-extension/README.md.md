# Answers AI Web Extension

## Summary
This is the Answers AI project for building the Chrome Extension using Vite, TypeScript, and React. It utilizes the CRXJS Vite plugin to bundle and package the extension for distribution.

## Getting Started

### Prerequisites
To run this project, you will need to have Node.js and npm installed on your machine.

### Installation
1. Clone this repository or download and extract the ZIP file.
2. Open a terminal or command prompt in the project directory.
3. Run `pnpm install` to install the project dependencies.

### Development
1. Run `pnpm run dev` to start a development server.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable Developer Mode by toggling the switch in the upper-right corner.
4. Click the "Load unpacked" button and select the dist folder in the project directory.
5. The extension should now be loaded and running.

### Production
1. Run `pnpm run build` to build the extension for production.
2. The packaged extension will be located in the dist folder.

## Configuration

### CRXJS Vite Plugin
This project uses the CRXJS Vite plugin to bundle and package the extension. Configuration for the plugin can be found in the vite.config.ts file.

### Content Scripts
Content scripts can be added to the extension by editing the content_scripts field in the manifest.json file.

### Background Scripts
Background scripts can be added to the extension by editing the background field in the manifest.json file.

### Related Files
None

### List of questions that could be answered about this document that could make it more useful
- What is the purpose of this project?
- What are the prerequisites for running this project?
- How do I install this project?
- How do I start a development server?
- How do I build the extension for production?
- What is the CRXJS Vite Plugin?
- How do I add content scripts to the extension?
- How do I add background scripts to the extension?

### List of questions that could be asked that the contents of this document could be a resource for developers
- How do I build a Chrome extension using Vite, TypeScript, and React?
- What is the CRXJS Vite Plugin and how do I use it?
- How do I add content scripts to a Chrome extension?
- How do I add background scripts to a Chrome extension?