'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {

  gulp.task('html', ['inject'], function () {

    /*
     * add tasks like:
     * uglify
     * replacements
     * html filters
     * minify
     * dist copy
     * */

    return gulp.src([
      options.src + '/**/*.*',
      options.tmp + '/serve/**/*.js',
      options.tmp + '/serve/**/*.css',
      '!' + options.src + '/js',
      '!' + options.src + '/css',
      '!' + options.src + '/**/raw/*.*',
      '!' + options.src + '/**/icons/*.*'
    ])
        .pipe(gulp.dest(options.dist + '/'));

  });


  gulp.task('build', ['html'],function () {
    return gulp.src([
      options.src + '/css/icons/*.*'
    ])
    .pipe(gulp.dest(options.dist + '/styles/icons'));
  });
};
