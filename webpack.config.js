const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildName = 'keen-explorer';

const devModule = {
  entry: ['./client/js/app/app.js', './client/styles/base.less'],

  output: {
    filename: `${buildName}.js`,
    path: './dist/',
    chunkFilename: `${buildName}.js`
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
    // extract inline css into separate 'styles.css'
    new ExtractTextPlugin(`${buildName}.css`),
  ],

  externals: {
    jquery: 'jQuery',
  }
}

module.exports = devModule;
