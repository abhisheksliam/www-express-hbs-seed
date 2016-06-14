'use strict';

var gulp = require('gulp'),
    inject = require('gulp-inject'), //https://www.npmjs.com/package/gulp-inject
    path = require('path'),
    wrench = require('wrench');

var options = {
    src: 'app',
    server: 'server',
    dist: 'dist',
    tmp: '.tmp/views',
    paths : {
        less: ['./app/css/**/*.less'],
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
    }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file)(options);
});

gulp.task('default',function () {
    gulp.start('build');
});

