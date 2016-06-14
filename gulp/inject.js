'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {

  gulp.task('inject', ['scripts'], function () {
    var injectStyles = gulp.src(options.paths.css,
        {read: false});

    var injectScripts = gulp.src(options.paths.javascript,
        {read: false});

    var injectOptions = {relative: false,ignorePath: 'app', addRootSlash: false};

    return gulp.src(options.server + '/views/**/*.hbs')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(gulp.dest(options.tmp + '/views'))

  });
};
