Filepath: packages/experimental-prisma-webpack-plugin/index.js
Overview: Summary:
This file exports a class called PrismaPlugin which is used as a plugin in a webpack configuration. The plugin is responsible for copying required Prisma files (schema and engine) to the output directory of the webpack build. It also updates nft.json files to include the Prisma files and renames schema.prisma files if there are multiple in the project.

Import statements:
- path: a Node.js module for working with file paths
- fs: a Node.js module for working with the file system
- webpack: the webpack module

Script Summary:
- Defines a regular expression to match the output directory of the Prisma client in a webpack bundle
- Defines a function to get the directory of the Prisma files (schema and engine)
- Defines a function to get all required Prisma files
- Defines a class called PrismaPlugin which is used as a plugin in a webpack configuration
- The plugin has three main functions:
  - Analyzes the webpack output to find which Prisma files need to be copied to the output directory
  - Updates nft.json files to include the Prisma files
  - Copies the Prisma files to the output directory

Internal Functions:
- getPrismaDir(from): Given a directory, returns the directory containing the Prisma files (schema and engine). If the directory contains a schema.prisma file, it is returned. Otherwise, the directory containing the generated Prisma client is returned.
- getPrismaFiles(from): Given a directory, returns an array of all required Prisma files (schema and engine).
- apply(compiler): The main function of the PrismaPlugin class. It is called when the plugin is applied to a webpack configuration. It analyzes the webpack output to find which Prisma files need to be copied to the output directory, updates nft.json files to include the Prisma files, and copies the Prisma files to the output directory.

External Functions:
- PrismaPlugin(options): The constructor for the PrismaPlugin class. It takes an optional options object as a parameter.

Interaction Summary:
This file is used as a plugin in a webpack configuration. It interacts with the webpack module and the file system to analyze the webpack output, update nft.json files, and copy Prisma files to the output directory.

Developer Questions:
- What is the purpose of this plugin in the webpack configuration?
- How does the plugin find the Prisma files to copy?
- What is the format of the nft.json files that are updated by the plugin?
- How does the plugin handle multiple schema.prisma files in a project?
- What happens if a Prisma file already exists in the output directory?

