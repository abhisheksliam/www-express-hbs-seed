'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {

  // Cleans Dist and temp folders
  gulp.task('clean', $.del.bind(null, [options.dist + '/', options.tmp + '/']));
	
  gulp.task('html', ['inject'], function () {
	  
	  return gulp.src([
      	options.src + '/**/*.*',
      	'!' + options.src + '/js/*.*',
      	'!' + options.src + '/css/**/*.*'
    	])
        .pipe(gulp.dest(options.dist + '/'));
	  
  });

  gulp.task('build', ['html'],function () {
    return gulp.src(options.src + '/css/icons/**/*.*')
    	.pipe(gulp.dest(options.tmp + '/css/icons'))
		.pipe(gulp.dest(options.dist + '/styles/icons'));
  });

};
