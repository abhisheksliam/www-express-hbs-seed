'use strict';

var gulp = require('gulp'),
    inject = require('gulp-inject'), //https://www.npmjs.com/package/gulp-inject
    path = require('path'),
    wrench = require('wrench');

var options = {
    src: 'app',
    server: 'server',
    dist: 'dist',
    tmp: '.tmp',
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
    },
    wiredep: {
        directory: 'bower_components',
        exclude: [
            /bootstrap-sass-official\/.*\.js/,
            /bootstrap\.css/,
            /open-sans-fontface\/.*/
        ],
        fileTypes: {
            html: {
                replace: {
                    js: function (filePath) {
                        var options = '';
                        if (filePath.match(/pace\.js/)) {
                            options = " data-pace-options='{ \"target\": \".content-wrap\", \"ghostTime\": 1000 }'"
                        }
                        return '<script' + options + ' src="' + filePath + '"></script>';
                    }
                }
            }
        },
        ignorePath: /^(\.\.\/)+/
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

