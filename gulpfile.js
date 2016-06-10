'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject'); //https://www.npmjs.com/package/gulp-inject

var paths = {
    less: ['./less/**/*.less'], // not active
    javascript: [
        './app/index.js',
        './app/modules/**/*module.js',
        './app/modules/**/*controller.js',
        './app/modules/**/*.js',
        '!./www/js/app.js',
        '!./www/lib/**'
    ],
    css: [
        './app/**/*.css',
        '!./www/css/ionic.app*.css',
        '!./www/lib/**'
    ]
};

gulp.task('index', function(){
    return gulp.src('./server/views/**/*.hbs')
        .pipe(inject(
            gulp.src(paths.javascript,
                {read: false}), {relative: false,ignorePath: 'app', addRootSlash: false}))
        .pipe(gulp.dest('./.tmp/views'))
/*        .pipe(inject(
            gulp.src(paths.css,
                {read: false}), {relative: true}))
        .pipe(gulp.dest('./.tmp/views'));*/
});

gulp.task('default', ['less', 'index']);

gulp.task('watch', function() {
    gulp.watch(paths.less, ['less']);
    gulp.watch([
        paths.javascript,
        paths.css
    ], ['index']);
});
