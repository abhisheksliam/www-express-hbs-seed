'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('scripts', function () {
    return gulp.src(options.src + '/**/*.js')
          .pipe(jshint())
          .pipe(jshint.reporter('jshint-stylish'));

  });
};
