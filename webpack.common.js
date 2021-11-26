const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const loadConfig = require('./webpack/load-config');

const createWebpackConfig = ({
  environment,
  origin,
  isProductionBuild
}) => {
  const babelPresets = [
    '@babel/preset-typescript',
    '@babel/preset-react',
  ];

  const babelPlugins = [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
  ];

  if (isProductionBuild) {
    babelPresets.push(['@babel/preset-env', { corejs: '3.6', useBuiltIns: 'entry' }]);

    babelPlugins.push(
      [
        "@quickbaseoss/babel-plugin-styled-components-css-namespace",
        {"cssNamespace": "&&&"}
      ],
      ["babel-plugin-styled-components", {
        "namespace": "keen-explorer",
        "minify": true,
        "transpileTemplateLiterals": true
      }]
    );
  } else {
    babelPlugins.push("react-hot-loader/babel");
  }

  return {
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
              options: {
                presets: babelPresets,
                plugins: babelPlugins,
              }
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
          translationsConfig: JSON.stringify(environment ? {
            backend: {
              loadPath: `${origin}${environment}/locales/{{lng}}/{{ns}}.json`
            }
          } : {}),
          projectConfig: JSON.stringify(
            loadConfig()
          )
        },
        template: path.join(__dirname, 'public', 'index.html'),
      }),
    ],
  }
};

module.exports = createWebpackConfig;
