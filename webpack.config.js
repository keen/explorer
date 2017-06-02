const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildName = 'keen-explorer';
const minExt = (process.env.NODE_ENV === 'production' ? 'min.' : '');

const devModule = {
  entry: ['./client/js/app/app.js', './client/styles/base.less'],

  output: {
    filename: `${buildName}.${minExt}js`,
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
      },

      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css!less")
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin(`${buildName}.${minExt}css`),
  ],

  externals: {
    jquery: 'jQuery',
  }
}

module.exports = devModule;
