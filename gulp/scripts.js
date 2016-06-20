'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
  gulp.task('pre-scripts', function () {

      return gulp.src(options.src + '/js/*.js')
          .pipe(gulp.dest(options.tmp + '/js'));

    //return gulp.src(options.src + '/**/*.js')
    //      .pipe(jshint())
    //.pipe(jshint.reporter('jshint-stylish'))

  });


    gulp.task('scripts',['pre-scripts'], function () {

        return gulp.src(options.tmp + '/js/*.js')
            .pipe($.concat('all.js'))
            .pipe($.rev())
            .pipe(gulp.dest(options.tmp + '/serve/scripts'));

    });

};
