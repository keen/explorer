const path = require('path');
const merge = require('webpack-merge');

const createWebpackConfig = require('./webpack.common');

const config = merge(createWebpackConfig(), {
  mode: 'development',
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: 'KeenExplorer',
    libraryExport: 'KeenExplorer',
    libraryTarget: 'umd',
  },
});

module.exports = config;
