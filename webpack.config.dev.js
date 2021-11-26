const path = require('path');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config = merge(commonConfig({
  isProductionBuild: false,
}), {
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
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
});
module.exports = config;
