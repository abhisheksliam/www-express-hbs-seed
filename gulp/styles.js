'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
    gulp.task('pre-styles', function () {
        return gulp.src([options.src + '/css/less/theme.less',
            options.src + '/css/less/ui.less',
            options.src + '/css/less/style.less',
            options.src + '/css/less/layout.less',
            options.src + '/css/raw/angular-theme.css'
        ])
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(options.tmp + '/css'));
    });

    gulp.task('copy-styles', function () {

        return gulp.src([
            options.tmp + '/css/angular-theme.css',
            options.tmp + '/css/layout.css',
        ])
            .pipe(gulp.dest(options.tmp + '/serve/styles'))
    });

    gulp.task('styles',['pre-styles', 'copy-styles'], function () {

        return gulp.src([
            options.tmp + '/css/style.css',
            options.tmp + '/css/theme.css',
            options.tmp + '/css/ui.css'
        ])
            .pipe($.concat('all.css'))
            .pipe($.rev())
            .pipe(gulp.dest(options.tmp + '/serve/styles'))
    });
};
