'use strict';

const webpack = require('webpack');

const devModule = {
  entry: './client/js/app/app.js',
  output: {
    filename: 'keen-explorer-webpack.js',
    path: './dist/'
  },
  module: {
    loaders: [
      {
        test: /picker/,
        loader: 'imports?define=>false'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        }
      }
    ]
  },
  externals: {
    jquery: 'jQuery',
  }
}

module.exports = devModule;
