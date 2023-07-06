const { PrismaPlugin } = require('experimental-prisma-webpack-plugin');

const webpack = require('webpack');
const { withSentryConfig } = require('@sentry/nextjs');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/**
 * @type {import('next').NextConfig}
 */
let nextConfig = withBundleAnalyzer({
  experimental: {
    appDir: true
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

  webpack: (config, { isServer }) => {
    config.externals = [...config.externals, 'puppeteer', 'canvas'];
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

const disableSentry = process.env.DISABLE_SENTRY;
if (!disableSentry) {
  nextConfig = withSentryConfig(nextConfig);
} else {
  console.warn('Sentry is disabled.  Please check your environment variables.');
}

module.exports = nextConfig;
