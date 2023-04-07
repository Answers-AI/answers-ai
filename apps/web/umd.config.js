const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: {
    'chat-button': './externalWidgets/renderExternalChatWidget.ts'
  },
  output: {
    path: path.resolve(__dirname, 'public', 'umd'),
    filename: '[name].js',
    library: 'ChatButton',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  optimization: {
    providedExports: true,
    usedExports: true
  },
  externals: [
    nodeExternals({
      // Add the modules you want to exclude from the UMD bundle
      allowlist: ['react', 'react-dom']
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react')
    }
  },
  module: {
    rules: [
      {
        test: [
          /externalWidgets\/ExternalChatWidget\.tsx?$/,
          /externalWidgets\/renderExternalChatWidget\.ts?$/
        ],
        exclude: [/node_modules/, /next\.config\.ts/],
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.umd.json',
            transpileOnly: true
          }
        }
      }
      // other loaders
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
