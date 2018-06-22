const pkg = require('./package');

module.exports = {
  files: './**',
  ignore: [
    './node_modules/**',
    './replace-config.js'
  ],
  from: [
    RegExp(`${pkg.name}-(.*)\.bundle\.min\.js`, 'g'),
    RegExp(`${pkg.name}-(.*)\.min\.css`, 'g')
  ],
  to: [
    `${pkg.name}-${pkg.version}.bundle.min.js`,
    `${pkg.name}-${pkg.version}.min.css`
  ]
}
