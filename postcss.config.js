const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    require('precss'),
    require('postcss-import'),
    require('postcss-css-variables'),
    require('postcss-color-function'),
    process.env.OPTIMIZE_MINIMIZE ? require('cssnano')({
      preset: 'default',
    }) : null,
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 11', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
  ]
}
