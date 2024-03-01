const { PrismaPlugin } = require('experimental-prisma-webpack-plugin');
// const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

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
    appDir: true,
    serverComponentsExternalPackages: [
      '@aws-sdk/client-s3',
      '@aws-sdk/signature-v4-crt',
      '@aws-sdk/s3-request-presigner'
    ]
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
    config.externals = [...config.externals, 'db', 'puppeteer', 'handlebars'];
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
      // Avoid AWS SDK Node.js require issue
      // if (nextRuntime === 'nodejs') {
      //   config.plugins = [
      //     ...config.plugins,
      //     new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      //   ];
      // }
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
