const gulp = require('gulp');
const pkg = require('./package.json');

const aws = require('gulp-awspublish');
const rename = require('gulp-rename');

gulp.task('deploy', () => {
  var cacheLife, publisher, headers;
  if (!process.env.AWS_KEY || !process.env.AWS_SECRET) {
    throw 'AWS credentials are required!';
  }
  cacheLife = (1000 * 60 * 60); // 1 hour (* 24 * 365)
  headers = {
    'Cache-Control': 'max-age=' + cacheLife + ', public'
  };
  publisher = aws.create({
    'accessKeyId': process.env.AWS_KEY,
    'secretAccessKey': process.env.AWS_SECRET,
    'params': {
      'Bucket': 'keen-js',
      'Expires': new Date(Date.now() + cacheLife)
    }
  });

  var jsHeaders = Object.assign({}, headers, {
    'Content-Type': 'application/javascript;charset=UTF-8'
  });

  var cssHeaders = Object.assign({}, headers, {
    'Content-Type': 'text/css'
  });

  gulp
    .src([
      './dist/' + pkg.name + '.bundle.js',
      './dist/' + pkg.name + '.bundle.min.js'
    ])
    .pipe(rename(function(path) {
      path.dirname += '/apps/';
      var name = pkg.name + '-' + pkg.version + '.bundle';
      path.basename = (path.basename.indexOf('min') > -1) ? name + '.min' : name;
    }))
    .pipe(aws.gzip())
    .pipe(publisher.publish(jsHeaders, { force: true }))
    .pipe(publisher.cache())
    .pipe(aws.reporter());

  return gulp.src([
      './dist/' + pkg.name + '.css',
      './dist/' + pkg.name + '.min.css'
    ])
    .pipe(rename(function(path) {
      path.dirname += '/apps/';
      var name = pkg.name + '-' + pkg.version;
      path.basename = (path.basename.indexOf('min') > -1) ? name + '.min' : name;
    }))
    .pipe(aws.gzip())
    .pipe(publisher.publish(cssHeaders, { force: true }))
    .pipe(publisher.cache())
    .pipe(aws.reporter());
});
