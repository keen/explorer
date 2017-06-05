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

gulp.task('test:unit:run', function () {
  return gulp.src('./test/unit/index.html')
    .pipe(mochaPhantomJS())
    .on('error', function(error) {
      console.log(error);
    });
});

gulp.task('test:unit', function(callback) {
  runSequence('test:unit:run',
              callback);
});

// ********************
// Main tasks
// ********************

gulp.task('default', ['test:unit']);
