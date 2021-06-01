const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const loadAppConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    return require('./config');
  }
  return {};
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
  ],
})

module.exports = createWebpackConfig;
