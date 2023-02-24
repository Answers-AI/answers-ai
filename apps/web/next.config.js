const { PrismaPlugin } = require('experimental-prisma-webpack-plugin');

module.exports = {
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
};
