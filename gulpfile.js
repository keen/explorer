var gulp = require('gulp');
var pkg = require('./package.json');
var path = require('path');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
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
// Basic App Build tasks
// **********************

// Scripts
// *******

gulp.task('build-scripts', function() {
  return browserify('./client/js/app/app.js', {
      insertGlobals: true,
      debug: true
    })
    .transform(stringify(['.html']))
    .bundle()
    .pipe(source(buildConfig.buildName+'.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-scripts', function(){
  return gulp.src('./dist/'+buildConfig.buildName+'.js')
    .pipe(uglify())
    .pipe(rename(buildConfig.buildName+'.min.js'))
    .pipe(gulp.dest('./dist/'));
});

// Styles
// *******

gulp.task('build-styles', function() {
  return gulp.src('./client/styles/base.less')
    .pipe(less({
      paths: [
        path.join(__dirname, 'client', 'styles'),
        path.join(__dirname, 'node_modules')
      ]
    }))
    .pipe(concat(buildConfig.buildName+'.css'))
    .pipe(prefix())
    .pipe(gulp.dest('./dist'));
});

gulp.task('less', function(){
  return gulp.src(sources)
    .pipe(less())
    .pipe(concat(buildConfig.buildName+'.css'))
    .pipe(prefix())
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify-styles', function(){
  return gulp.src('./dist/'+buildConfig.buildName+'.css')
    .pipe(minifycss({
      keepSpecialComments: 0
    }))
    .pipe(rename(buildConfig.buildName+'.min.css'))
    .pipe(gulp.dest('./dist'));
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
// Server
// ********************

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
// Task groups
// ********************

gulp.task('scripts', function(callback) {
  runSequence('build-scripts',
              'minify-scripts',
              callback);
});

gulp.task('styles', function(callback) {
  runSequence('build-styles',
              'minify-styles',
              callback);
});

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

gulp.task('development', ['build-scripts', 'build-styles', 'connect', 'watch']);

gulp.task('development-with-tests', ['build-scripts', 'build-styles', 'connect', 'watch-with-tests']);

gulp.task('production', ['scripts', 'styles', 'test:unit']);

// ********************
// Watching
// ********************

gulp.task('watch', function() {
  gulp.watch(['client/**/*.js'], ['build-scripts']);
  gulp.watch('client/**/*.less', ['build-styles']);
  gulp.watch('client/images/**/*.*', ['images']);
});

gulp.task('watch-with-tests', function() {
  gulp.watch(['client/**/*.*', 'test/**/*.*'], ['test:unit']);
});

// ********************
// Main tasks
// ********************

gulp.task('default', ['development']);
