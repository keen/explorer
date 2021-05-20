const path = require('path');
const {merge} = require('webpack-merge');

const createWebpackConfig = require('./webpack.common');

const config = merge(createWebpackConfig(), {
  mode: 'development',
  target: 'web',
  devServer: {
    static: path.join(__dirname, 'public'),
    hot: true,
    compress: true,
    port: 8080,
  },
  output: {
    library: {
      name: 'KeenExplorer',
      export: 'KeenExplorer',
      type: 'umd',
    },
  },
});

module.exports = config;
