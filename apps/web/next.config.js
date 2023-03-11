const { PrismaPlugin } = require('experimental-prisma-webpack-plugin');
const webpack = require('webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client']
  },
  reactStrictMode: true,
  transpilePackages: ['ui', 'db', 'utils'],

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
