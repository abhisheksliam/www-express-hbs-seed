'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {

  gulp.task('file-reduce', [], function () {

    /*
    * add tasks like:
    * uglify
    * replacements
    * html filters
    * minify
    * dist copy
    * */

   });

  gulp.task('file-merge', [], function () {

    /*
     * add tasks like:
     * uglify
     * replacements
     * html filters
     * minify
     * dist copy
     * */

  });

  gulp.task('file-copy', [], function () {

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
      options.server + '/views/*.hbs',
      options.server + '/views/**/*.hbs',
      '!' + options.src + '/**/*.less',
      '!' + options.src + '/**/raw/*.*'
    ])
        .pipe(gulp.dest(options.dist + '/'));
  });

  gulp.task('dist', ['file-copy']);
};
