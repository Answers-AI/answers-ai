const { PrismaPlugin } = require('experimental-prisma-webpack-plugin');
const webpack = require('webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/**
 * @type {import('next').NextConfig}
 */
module.exports = withBundleAnalyzer({
  experimental: {
    appDir: true,
    enableUndici: true
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

    return config;
  }
});
