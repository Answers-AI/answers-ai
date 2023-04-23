#!/usr/bin/env node
const docubot = require("./src/docubot.old.js");
const pinecone = require("./src/pinecone.js");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

// Check if the script is being run directly (not being imported as a module)
if (require.main === module) {
  // Define the CLI using yargs
  const argv = yargs(hideBin(process.argv))
    .option("full", {
      alias: "f",
      description: "Run the full process on all files",
      type: "boolean",
    })
    .command(
      "start [file]",
      "Start Docubot",
      (yargs) => {
        yargs
          .positional("file", {
            describe: "Path to the file to be documented",
            type: "string",
          })
      },
      async (argv) => {
        // Start Docubot
        console.log("Starting Docubot with arguments...", argv)
        const filePath = argv.file;
        const fullProcess = argv.full;
        console.log(`Documenting code from file '${filePath}' using magic...`);
        await docubot.main(filePath, fullProcess); // Pass the file path and fullProcess flag to the main function
      }
    )
    .command(
      "save [dir]",
      "Save code into pinecone memory",
      (yargs) => {
        yargs.positional("dir", {
          describe: "Path to the directory where files will be saved",
          type: "string",
          default: ".", // Default directory is the current working directory
        });
      },
      async (argv) => {
        // Save code into pinecone memory
        const dirPath = argv.dir;
        console.log(`Saving code into pinecone memory at '${dirPath}'...`);
        await pinecone.main(dirPath); // Pass the directory path to main function
      }
    )
    .command(
      "husky",
      "watch file changes",
      {},
      async () => {
        // Save code into pinecone memory
        console.log("Saving code into pinecone memory...");
        await pinecone.save(); // Use the imported 'save' function
      }
    )
    .command("list", "List all saved files", {}, () => {
      // List all saved files
      console.log("Listing all saved files...");
      // TODO: Implement the list functionality
    })
    .demandCommand(1, "You need to specify a command to run.")
    .help()
    .alias("h", "help").argv;

  // If no subcommand is provided, show help
  if (argv.length === 0) {
    yargs.showHelp();
  }
  // index.js
  module.exports = {
    argv,
  };
}


