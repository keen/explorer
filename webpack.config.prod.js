const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const createWebpackConfig = require('./webpack.common');

const FILE_NAME = 'explorer';

module.exports = (env) => {
  const useLegacyBrowsers = env.TARGET_LEGACY_BROWSERS === 'true';

  const config = merge(createWebpackConfig(useLegacyBrowsers), {
    context: __dirname,
    mode: 'production',
    devtool: 'source-map',

    entry: {
      main: `./lib/index${useLegacyBrowsers ? '.polyfills': ''}.ts`,
    },
    target: 'web',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `${FILE_NAME}.${useLegacyBrowsers ? 'legacy': 'modern'}.min.js`,
      libraryTarget: 'umd',
    },

    optimization: {
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

  if (env.ANALYZE_BUNDLE) {
    config.plugins.push(
      new BundleAnalyzerPlugin()
    );
  };

return config;
};
