const { PrismaPlugin } = require('experimental-prisma-webpack-plugin');
// const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

const webpack = require('webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  transpilePackages: ['ui', 'db', 'utils'],
  modularizeImports: {
    '@mui/material/?(((\\w*)?/?)*)': {
      transform: '@mui/material/{{ matches.[1] }}/{{member}}'
    },
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
    }
  },
  webpack: (config, { isServer }) => {
    config.externals = [...config.externals, 'db'];
    // if (isServer) {
    config.plugins = [
      ...config.plugins,
      new PrismaPlugin(),
      new webpack.IgnorePlugin({
        resourceRegExp: /canvas/,
        contextRegExp: /jsdom$/
      })
    ];
    // }

    return config;
  }
});
