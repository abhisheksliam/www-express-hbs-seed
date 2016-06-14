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
    * css filters
    * js filters
    * replacements
    * html filters
    * minify
    * dist copy
    * */
  });

//gulp.task('clean', $.del.bind(null, [options.dist + '/', options.tmp + '/']));

  gulp.task('build', ['html']);
};
