const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const commonConfig = require('./webpack.common');

const fileName = 'keen-explorer';

module.exports = merge(commonConfig, {
  context: __dirname,
  mode: 'production',
  devtool: 'source-map',

  entry: ['./lib/index.js'],
  target: 'web',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${
      fileName
    }${
      process.env.BUNDLE ? '.bundle' : '.umd'
    }${
      process.env.OPTIMIZE_MINIMIZE ? '.min' : ''
    }.js`,
    library: `${!process.env.LIBRARY ? '' : process.env.LIBRARY}`,
    libraryTarget: 'umd',
  },

  optimization: {
     minimize: !!process.env.OPTIMIZE_MINIMIZE,
     minimizer: [
       new TerserPlugin({
         terserOptions: {
           keep_classnames: true,
           keep_fnames: true,
         },
       }),
     ],
   },

   plugins: [
     new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
     new webpack.optimize.ModuleConcatenationPlugin(),
  ]
});
