const { PrismaPlugin } = require('experimental-prisma-webpack-plugin');
// const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

const webpack = require('webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  transpilePackages: ['ui', 'db', 'utils'],
  modularizeImports: {
    '@mui/material/?(((\\w*)?/?)*)': {
      transform: '@mui/material/{{ matches.[1] }}/{{member}}'
    }
  },
  webpack: (config: any) => {
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
};

export default withBundleAnalyzer(nextConfig);
