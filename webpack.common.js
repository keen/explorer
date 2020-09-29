const webpack = require('webpack');
const path =  require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const loadConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    return require('./config');
  }
  return {};
};

module.exports = {
  entry: {
    main: './lib/index.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // exclude: /node_modules\/(?!(framesync)\/).*/,
        // exclude: {
        //   test: /node_modules/,
        //   exclude: "/node_modules/framesync",
        // },
        exclude: /node_modules/,
        // exclude: /node_modules\/(?!(framesync)\/).*/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      templateParameters: {
        'config': JSON.stringify(
          loadConfig()
        )
      },
      template: path.join(__dirname, 'test', 'demo', 'index.html'),
    }),
  ],
};
