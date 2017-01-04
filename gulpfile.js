var gulp = require('gulp');
var pkg = require('./package.json');
var path = require('path');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var browserify = require('browserify');
var stringify = require('stringify');
var source = require('vinyl-source-stream');
var historyApiFallback = require('connect-history-api-fallback');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var mochaSelenium = require('gulp-mocha-selenium');

// **********************
// Build Config
// **********************

var buildConfig = {
  buildName: 'keen-explorer'
};

// **********************
// Server
// **********************

gulp.task('connect', function () {
  connect.server({
    root: [__dirname, 'demo', 'dist'],
    port: process.env.PORT || 8081,
    middleware: function(connect, opt) {
      return [ historyApiFallback ];
    }
  });
});

// ********************
// Testing
// ********************

gulp.task('test:functional', function () {
  return gulp.src('test/functional/index.js', {read: false})
    .pipe(mochaSelenium({
      browserName: 'chrome',
      reporter: 'spec',
      useChaining: true,
      timeout: 30e3
    }));
});

gulp.task('test:unit:clean', function() {
  return gulp.src('./test/unit/build', { read: false })
    .pipe(clean());
});

gulp.task('test:unit:build', function () {
  return browserify('./test/unit/index.js', {
      insertGlobals: true,
      debug: true
    })
    .transform(stringify(['.html']))
    .bundle()
    .pipe(source('browserified_tests.js'))
    .pipe(gulp.dest('./test/unit/build'));
});

gulp.task('test:unit:run', function () {
  return gulp.src('./test/unit/index.html')
    .pipe(mochaPhantomJS());
});

// ********************
// Task groups
// ********************

gulp.task('test:build', function(callback) {
  runSequence('test:unit:clean',
              'test:unit:build',
              callback);
});

gulp.task('test:unit', function(callback) {
  runSequence('test:build',
              'test:unit:run',
              callback);
});

// ********************
// Main tasks
// ********************

gulp.task('default', ['test:unit']);
