# Answers AI Web Extension

This is the Answers AI project for building the Chrome Extension using Vite, TypeScript, and React. It utilizes the CRXJS Vite plugin to bundle and package the extension for distribution.

## Getting Started

### Prerequisites

To run this project, you will need to have Node.js and npm installed on your machine.

### Installation

- Clone this repository or download and extract the ZIP file.
- Open a terminal or command prompt in the project directory.
- Run `pnpm install` to install the project dependencies.

### Development

- Run `pnpm run dev` to start a development server.
- Open Google Chrome and navigate to `chrome://extensions`.
- Enable Developer Mode by toggling the switch in the upper-right corner.
- Click the "Load unpacked" button and select the dist folder in the project directory.
- The extension should now be loaded and running.

### Production

- Run `pnpm run build` to build the extension for production.
- The packaged extension will be located in the dist folder.

## Configuration

### CRXJS Vite Plugin

This project uses the CRXJS Vite plugin to bundle and package the extension. Configuration for the plugin can be found in the vite.config.ts file.

### Content Scripts

Content scripts can be added to the extension by editing the content_scripts field in the manifest.json file.

### Background Scripts

Background scripts can be added to the extension by editing the background field in the manifest.json file.
