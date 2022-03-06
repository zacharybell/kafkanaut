import path = require('path');

import { Configuration } from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const extension: Configuration = {
  name: 'main-extension',
  target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

  entry: './src/main/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // modules added here also need to be added in the .vscodeignore file
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  devtool: 'nosources-source-map',
  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },
};

const createWebViewConfig = (entry: string, name: string) => {
  return {
    entry,
    name,
    output: {
      path: path.resolve(__dirname, 'dist/webviews'),
      publicPath: '',
      filename: `${name}.js`
    },
    module: {
      rules: [
        { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
        { test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader' ] },
        { test: /\.(png|jpg)$/, use: 'file-loader' }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${name}.css`,
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
  };
};

const messageInspectorWebview = createWebViewConfig('./src/webview/messages/index.tsx', 'message-inspector');

module.exports = [ extension, messageInspectorWebview ];