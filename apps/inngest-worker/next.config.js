const { PrismaPlugin } = require('experimental-prisma-webpack-plugin');
const webpack = require('webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const disableSentry = process.env.DISABLE_SENTRY;

if (!disableSentry) {
  console.warn('Sentry is disabled.  Please check your environment variables.');
}

/**
 * @type {import('next').NextConfig}
 */
module.exports = withBundleAnalyzer({
  experimental: {
    // appDir: true,
    serverComponentsExternalPackages: ['@prisma/client']
  },
  reactStrictMode: true,
  transpilePackages: ['ui', 'db', 'utils'],
  modularizeImports: {
    // '@mui/material/?(((\\w*)?/?)*)': {
    //   transform: '@mui/material/{{ matches.[1] }}/{{member}}'
    // },
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
    }
  },
  sentry: {
    disableServerWebpackPlugin: disableSentry,
    disableClientWebpackPlugin: disableSentry
  },
  webpack: (config, { isServer }) => {
    config.externals = [...config.externals, 'db', 'puppeteer'];

    config.plugins = [
      ...config.plugins,
      // new PrismaPlugin(),
      new webpack.IgnorePlugin({
        resourceRegExp: /canvas/,
        contextRegExp: /jsdom$/
      })
    ];

    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  }
});
