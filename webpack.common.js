const webpack = require('webpack');
const path =  require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const loadAppConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    return require('./config');
  }
  return {};
};

const createWebpackConfig = () => {
  const config = {
    entry: {
      main: './src/index.ts',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
            }, 
            {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json'
            }
          }],
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
            loadAppConfig()
          )
        },
        template: path.join(__dirname, 'public', 'index.html'),
      }),
    ],
  };

  return config;
};

module.exports = createWebpackConfig;
