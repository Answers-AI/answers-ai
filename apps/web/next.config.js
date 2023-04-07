const { PrismaPlugin } = require('experimental-prisma-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
// const TerserWebpackPlugin = require('terser-webpack-plugin');
// const fs = require('fs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
// const path = require('path'); // add this import statement
const UmdConfig = require('./umd.config');

/**
 * @type {import('next').NextConfig}
 */
module.exports = withBundleAnalyzer({
  experimental: {
    appDir: true,
    enableUndici: true
  },
  reactStrictMode: true,
  transpilePackages: ['ui', 'db', 'utils', 'externalWidgets'], // Add extraBundle here
  modularizeImports: {
    '@mui/material/?(((\\w*)?/?)*)': {
      transform: '@mui/material/{{ matches.[1] }}/{{member}}'
    },
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
    }
  },
  webpack: (config, { isServer, dev }) => {
    config.externals = [...config.externals, 'db'];

    config.plugins = [
      ...config.plugins,
      new PrismaPlugin(),
      new webpack.IgnorePlugin({
        resourceRegExp: /canvas/,
        contextRegExp: /jsdom$/
      })
    ];

    if (!dev && !isServer) {
      // Merge the UMD module config with the Next.js config
      const umdConfig = UmdConfig;
      const mergedConfig = {
        ...config,
        entry: {
          ...config.entry,
          ...umdConfig.entry
        },
        output: {
          ...config.output,
          ...umdConfig.output
        },
        plugins: [...config.plugins, ...umdConfig.plugins]
      };
      return mergedConfig;
    }

    // if (!isServer) {
    //   const originalEntry = config.entry;
    //   config.entry = async () => {
    //     const entries = await originalEntry.call(config);

    //     entries.answerAiChat = [
    //       'react',
    //       'react-dom',
    //       './externalWidgets/renderExternalChatWidget.ts'
    //     ];

    //     return entries;
    //   };

    //   console.log(config.entry);

    //   if (config.entry.answerAiChat) {
    //     config.output.libraryTarget = 'umd';
    //   }

    //   // Configure output filename for the extra bundle
    //   // config.output.filename = (chunkData) => {
    //   //   return chunkData.chunk.name === 'externalWidgets/answer-ai-chat'
    //   //     ? 'externalWidgets/answer-ai-chat.js'
    //   //     : dev
    //   //     ? '[name].js'
    //   //     : '[name].[contenthash].js';
    //   // };

    //   // config.plugins.push(
    //   //   new CopyWebpackPlugin({
    //   //     patterns: [
    //   //       {
    //   //         from: path.join(config.output.path, 'externalWidgets/answer-ai-chat.js'),
    //   //         to: path.join(__dirname, 'public/externalWidgets/answer-ai-chat.js')
    //   //       }
    //   //     ]
    //   //   })
    //   // );

    //   // Add an afterEmit hook to copy the generated file to the public/externalWidgets directory
    //   // config.plugins.push({
    //   //   apply(compiler) {
    //   //     const answerAiChatPath = path.join(
    //   //       config.output.path,
    //   //       'externalWidgets',
    //   //       'answer-ai-chat.js'
    //   //     );

    //   //     console.log({
    //   //       answerAiChatPath,
    //   //       path: path.join(__dirname, 'public', 'externalWidgets', 'answer-ai-chat.js')
    //   //     });

    //   //     const copyPlugin = new CopyWebpackPlugin({
    //   //       patterns: [
    //   //         {
    //   //           from: answerAiChatPath,
    //   //           to: path.join(__dirname, 'public', 'externalWidgets', 'answer-ai-chat.js')
    //   //         }
    //   //       ]
    //   //     });

    //   //     compiler.hooks.done.tapAsync('CopyWebpackPlugin', (stats) => {
    //   //       // compiler.hooks.done.tapAsync('CopyWebpackPlugin', (compilation, callback) => {
    //   //       if (fs.existsSync(answerAiChatPath)) {
    //   //         copyPlugin.apply(compiler);
    //   //       }

    //   //       callback();
    //   //     });
    //   //   }
    //   // });

    //   // config.optimization.minimizer = [
    //   //   ...config.optimization.minimizer,
    //   //   new TerserWebpackPlugin({
    //   //     include: /externalWidgets[\\/]/
    //   //   })
    //   // ];
    // }

    return config;
  }
});
