# Experimental Prisma Webpack Plugin

## Summary
This documentation explains how to use the Experimental Prisma Webpack Plugin to ensure that your Prisma files are copied.

## Next.js

```js
const { PrismaPlugin } = require('experimental-prisma-webpack-plugin')

module.exports = {
  output: 'standalone',
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
}
```

## Webpack

```js
const { PrismaPlugin } = require('experimental-prisma-webpack-plugin')

module.exports = {
  plugins: [new PrismaPlugin()]
}
```

## Known issues

### Multiple clients

If you are using multiple clients, they must be of the same version.

This is because the plugin assumes the engines will have same versions.

### Related Files
None

### List of questions that could be answered about this document that could make it more useful
- What is the Experimental Prisma Webpack Plugin?
- How do I use the Experimental Prisma Webpack Plugin?
- What are the known issues with the Experimental Prisma Webpack Plugin?

### List of questions that could be asked that the contents of this document could be a resource for developers
- How can I ensure that my Prisma files are copied using Webpack?
- What should I do if I am using multiple clients with different versions?