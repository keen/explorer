const path =  require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const loadAppConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    return require('./config');
  }
  return {};
};

const babelOptions = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "react-hot-loader/babel"
  ]
};

const createWebpackConfig = () => ({
    entry: {
      main: './src/index.ts',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: babelOptions,
              },
            ],
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
        scriptLoading: "blocking",
        templateParameters: {
          'config': JSON.stringify(
            loadAppConfig()
          )
        },
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      new ForkTsCheckerWebpackPlugin()
    ],
})

module.exports = createWebpackConfig;
