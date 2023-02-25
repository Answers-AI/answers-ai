const { PrismaPlugin } = require('experimental-prisma-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  transpilePackages: ['ui', 'db', 'utils'],
  webpack: (config, { isServer }) => {
    // if (isServer) {
    config.plugins = [...config.plugins, new PrismaPlugin()];
    // }

    return config;
  }
});
