'use strict';

var gulp = require('gulp');
var path = require('path');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

module.exports = function(options) {

    gulp.task('partials', function () {
        return gulp.src([
                options.src + '/**/*.html'
            ])
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
            .pipe($.angularTemplatecache('templateCacheHtml.js', {
                module: 'automationApp',
                root: ''
            }))
            .pipe(gulp.dest(options.tmp + '/partials/'));
    });

    gulp.task('html', ['inject', 'partials'], function () {

        var injectTemplateFile =  gulp.src(path.join(options.tmp, '/partials/templateCacheHtml.js'),
            {read: false});

        var injectOptions = {
            starttag:'<!-- inject:partials -->',
            relative: false,
            ignorePath: path.join(options.tmp),
            addRootSlash: false};

        return gulp.src(path.join(options.tmp, '/views/partials/foot.hbs'))
            .pipe($.inject(injectTemplateFile, injectOptions))
            .pipe(gulp.dest(path.join(options.tmp, '/views/partials')));


        // For Production Mode
        /*return gulp.src([
         options.src + '/!**!/!*.*',
         '!' + options.src + '/js/!*.*',
         '!' + options.src + '/css/!**!/!*.*'
         ])
         .pipe(gulp.dest(options.dist + '/'));*/
    });

  // Cleans Dist and temp folders
  gulp.task('clean', $.del.bind(null, [options.tmp + '/']));
  //If production Mode, then clean dist as well ; options.dist + '/',

  // Starts server in development mode (Pass NODE_ENV as 'development' or ''.)
  gulp.task('start', ['watch'], function(cb) {
    var started = false;
    return $.nodemon({
        script: 'server.js',
        ext: 'hbs js',
        env: { 'NODE_ENV': 'development' },
        watch: [options.server+'/**/*.*','server.js']
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function onRestart() {
        // reload connected browsers after a slight delay
        setTimeout(reload, BROWSER_SYNC_RELOAD_DELAY);
    });
  });

    gulp.task('serve',['start'], function(){
        browserSync.init({
            proxy: "localhost:8080",
            port: 8081,
            files: [options.src+'/**/*.*'],
            notify: true
        });
    });

  gulp.task('build', ['html'],function () {
    return gulp.src(options.src + '/css/icons/**/*.*')
    	.pipe(gulp.dest(options.tmp + '/css/icons'));

        // For Production Mode, Copy Icons
		//.pipe(gulp.dest(options.dist + '/styles/icons'));
  });
	

};
