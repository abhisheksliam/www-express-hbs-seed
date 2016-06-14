'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('styles', function () {
      return gulp.src([options.src + '/css/less/*.less',
          options.src + '/css/less/**/*.less'
      ])
          .pipe(less({
              paths: [ path.join(__dirname, 'less', 'includes') ]
          }))
          .pipe(gulp.dest(options.src + '/css/dist'));
  });
};
