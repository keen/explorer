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
    library: {
      name: 'KeenExplorer',
      type: 'umd',
      umdNamedDefine: true,
    },
    globalObject: 'window',
  },ild
});

module.exports = config;
