/* test each task, install fixed version of module or replacement
  gulp.util deprecated in gulp v4
  https://medium.com/gulpjs/gulp-util-ca3b1f9f9ac5
  breaks all modules that depend on it
  see ./gulpUtildeps.txt
*/

"use strict";

  const gulp = require('gulp'),
         del = require('del'),
      rename = require('gulp-rename'),
        sass = require('gulp-sass'),
        maps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      useref = require('gulp-useref'),
         iff = require('gulp-if'),
        csso = require('gulp-csso');

const options = { src: 'src', dist: 'dist'};

// prep css for production
// compile sass into css,
// copy to /dist/css folder,
// save global.css and map.css
gulp.task('compileSass', function() {
  return gulp.src(`${options.src}/sass/global.scss`)
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest(`${options.src}/css`));
});

// js task
// run by watch task when there are changes
// concat and minify js files for production
// use build refs found in index.html, minifying all js
// copy to /dist folder
gulp.task('js', function() {
  gulp.src(options.src + '/index.html')
    .pipe(useref())
    .pipe(iff(`*.js`, uglify()))
    .pipe(gulp.dest(options.dist));
});

// prep js files for production
// run compileSass
// use build refs found in index.html, minifying all js and css
// copy to /dist folder
gulp.task('html', ['compileSass'], function() {
  gulp.src(options.src + '/index.html')
    .pipe(useref())
    .pipe(iff('*.js', uglify()))
    .pipe(iff('*.css', csso()))
    .pipe(gulp.dest(`${options.dist}`));
});

// remove the /dist folder and everything in it
gulp.task('clean', function() {
  del([options.dist, options.dist + '/css/global.css*', options.dist + '/js/app*.js*']);
});

// build task
// run html task, then
// will be compressing image and icon files for producton
// copy to /dist folder
gulp.task("build", ['html'], function() {
  return gulp.src([ `${options.src}/images/**`, `${options.src}/icons/**`], { base: `${options.src}/`})
            .pipe(gulp.dest(options.dist));
});

// default task
// run clean task first
// and then run build task
gulp.task("default", ["clean"], function() {
  gulp.start('build');
});

// watchFiles task
// watch for changes to scss and js files
// when changes found run compileSass or js task, respectively
gulp.task('watchFiles', function() {
  gulp.watch(options.src + '/sass/**/*.scss', ['compileSass']);
  gulp.watch(options.src + '/js/**/*.js', ['js']);
})

// serve task
// when watchFiles task runs
// restart server
gulp.task('serve', ['watchFiles'], function () {
  // code to run build vs pro server here
});
