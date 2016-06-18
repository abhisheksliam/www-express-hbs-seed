'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('styles', function () {
      return gulp.src([options.src + '/css/less/theme.less',
                      options.src + '/css/less/ui.less',
                      options.src + '/css/less/style.less',
                      options.src + '/css/less/layout.less'
          ])
          .pipe(less({
              paths: [ path.join(__dirname, 'less', 'includes') ]
          }))
          .pipe(gulp.dest(options.src + '/css' +
          ''));
      // todo: inject css to head
  });
    // copy angular-theme css to dist
};
