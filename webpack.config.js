require('@babel/polyfill');

const path = require('path');
const webpack = require('webpack');

const fileName = 'keen-explorer';

let definePluginVars = {};
if (process.env.NODE_ENV === 'development') {
  const demoConfig = require('../demo-config');
  definePluginVars = {
    webpackKeenGlobals: JSON.stringify({ demoConfig })
  };
}

module.exports = {
  entry: ['@babel/polyfill', './lib/js/app/app.js'],

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

  module: {

    rules: [
      {
        test: /picker/,
        loader: 'imports-loader?define=>false',
      },

      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, 'lib'),
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        loader: 'babel-loader',

      },

      {
        test: /\.html$/,
        loader: 'html-loader',
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],

  },

  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.json', '.jsx'],
  },

  optimization: {
    minimize: !!process.env.OPTIMIZE_MINIMIZE,
  },

  devtool: 'source-map',

  context: __dirname,

  // stats: 'verbose',

  plugins: [
    new webpack.DefinePlugin(definePluginVars),
  ],

  mode: process.env.NODE_ENV,

  devServer: {
    contentBase: path.join(__dirname, 'test/demo'),
    open: true,
    inline: true,
    hot: false,
    watchContentBase: true,
  },

  externals: !process.env.BUNDLE && process.env.NODE_ENV !== 'development' ? {
    classnames: true,
    'json-stable-stringify': true,
    'keen-analysis': true,
    'keen-dataviz': true,
    keymirror: true,
    lodash: true,
    moment: true,
    qs: true,
    react: true,
    'react-addons-test-utils': true,
    'react-dom': true,
    'react-highlight': true,
    string: true,
  } : {
  },

};
