const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const postcssVariables = require('postcss-css-variables');

module.exports = {
  plugins: [
    require('precss'),
    postcssImport,
    postcssVariables,
    postcssPresetEnv,
    process.env.OPTIMIZE_MINIMIZE ? require('cssnano')({
      preset: 'default',
    }) : null,
  ]
}
