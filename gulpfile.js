
"use strict";

// requiring needed modules
  const gulp = require('gulp'),
         del = require('del'),
    imagemin = require('gulp-imagemin'),
      rename = require('gulp-rename'),
        sass = require('gulp-sass'),
        maps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
         iff = require('gulp-if'),
        csso = require('gulp-csso'),
       serve = require('gulp-serve');

// vars for src and dist folder paths
const options = { src: 'src', dist: 'dist'};

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

// optimize and/or compress asset files, images and icons for distribution
// for now were just copying the files to /dist
// overwrite if any alreadt exist
gulp.task("images", function() {
  return gulp.src([ options.src + '/images/*'])
    .pipe(imagemin())
    .pipe(gulp.dest(`${options.dist}/images`));
});

// prep SASS files for distribution
// run compileSass
// use build refs found in index.html
// concat and minify all css
// copy to /dist folder and overwrite if any exist
gulp.task('styles',['compileSass'], function() {
  gulp.src([options.src + '/css/**/*.css'])
    .pipe(concat('global.css'))
    .pipe(iff('*.css', csso()))
    .pipe(gulp.dest(`${options.dist}/css`));
});

// prep JavaScript files for distribution
// run compileSass
// use build refs found in index.html
// concat and minify all js
// copy to /dist folder and overwrite if any exist
gulp.task('scripts', function() {
  gulp.src(options.src + '/js/**/*.js')
    .pipe(concat('global.js'))
    .pipe(iff('*.js', uglify()))
    .pipe(gulp.dest(`${options.dist}/js`));
});
// copy /dist/index.html with src/index.html
// overwrite, if it exists
gulp.task("updateHtml", function() {
  return gulp.src([ options.src + '/index.html'])
            .pipe(gulp.dest(`${options.dist}`));
});

// remove the /dist folder and everything in it
gulp.task('clean', function() {
  del([options.dist, options.dist + '/css/global.css*', options.dist + '/js/app*.js*']);
});

// build task, compileSass tasks first
// then run other tasks to prep src files for distribution
gulp.task("build",  ['clean', 'images', 'updateHtml', 'scripts', 'styles']);

// watchFiles task
// watch for changes to html, image files, scss and js files
// when a change is detected run appropriate task
gulp.task('watchFiles', function() {
  gulp.watch(options.src + '/index.html', ['updateHtml']);
  gulp.watch(options.src + '/images/**/**', ['images']);
  gulp.watch(options.src + '/sass/**/*.scss', ['styles']);
  gulp.watch(options.src + '/js/**/*.js', ['scripts']);
})

// serve task
// runs the build task
// runs watchFiles task
// starts a server
// if watchFiles runs any tasks, server is restarted
gulp.task('serve', ['build','watchFiles'], serve(options.dist));

// default task
// and then run serve task
gulp.task("default", ["serve"]);
