'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('scripts', function () {

      return gulp.src(options.src + '/js/*.js')
          .pipe(gulp.dest(options.tmp + '/js'))
          .pipe(browserSync.reload({stream: true}))
          .pipe($.size());


      // For prod-mode Concatenating Files and then versioning can be done
	  // .pipe($.concat('app.js'))
      // .pipe(gulp.dest(options.tmp + '/serve/scripts'));

      // For JSHint
      // .pipe(jshint())
      // .pipe(jshint.reporter('jshint-stylish'))

  });


    // For Production Mode,
   /* gulp.task('scripts',['dev-scripts'], function () {
        return gulp.src(options.tmp + '/serve/!**!/!*.*')
            .pipe($.rev())
            .pipe(gulp.dest(options.dist + '/'));
    });*/
};
