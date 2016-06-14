'use strict';

var  gulp = require('gulp'),
     inject = require('gulp-inject'), //https://www.npmjs.com/package/gulp-inject
     less = require('gulp-less'),
     path = require('path');

var paths = {
    //less: ['./app/css/**/*.less'],
    javascript: [
        './app/index.js',
        './app/modules/**/*module.js',
        './app/modules/**/*controller.js',
        './app/modules/**/*.js',
        '!./www/js/app.js',
        '!./www/lib/**'
    ],
    css: [
        './app/css/dist/*.css',
        '!./www/css/ionic.app*.css',
        '!./www/lib/**'
    ]
};

gulp.task('less', function () {
    return gulp.src('./app/css/less/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./app/css/dist'));
});

gulp.task('index', function(){
    return gulp.src('./server/views/**/*.hbs')
        .pipe(inject(
            gulp.src(paths.javascript,
                {read: false}), {relative: false,ignorePath: 'app', addRootSlash: false}))
        .pipe(gulp.dest('./.tmp/views'))
/*        .pipe(inject( // inject not included as there is difference in generated and currently used files
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
