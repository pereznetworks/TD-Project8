
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
     connect = require('gulp-connect');

// vars for src and dist folder paths
const options = { src: 'src', dist: 'dist'};

// remove the /dist folder and everything in it
 gulp.task('clean', function() {
   del([options.dist, options.dist + '/css/global.css*', options.dist + '/js/app*.js*']);
 });

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

// optimize and/or compress images for distribution
// for now were just copying the files to /dist
// overwrite if any alreadt exist
gulp.task('images', ['clean'], function() {
  return gulp.src([ options.src + '/images/*'])
        .pipe(imagemin())
        .pipe(gulp.dest(`${options.dist}/images`));
});

// copy icons for distribution
// overwrite if any alreadt exist
gulp.task('icons', ['clean'], function() {
  return gulp.src([ options.src + '/icons/*'])
    .pipe(gulp.dest(`${options.dist}/icons`));
});

// prep SASS files for distribution
// run compileSass
// use build refs found in index.html
// concat and minify all css
// copy to /dist folder and overwrite if any exist
gulp.task('styles', ['compileSass'], function() {
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
gulp.task('updateHtml', function() {
  return gulp.src([ options.src + '/index.html'])
        .pipe(gulp.dest(`${options.dist}`));
});

// build task, compileSass tasks first
// then run other functions to prep src files for distribution
gulp.task("build", ['clean'], function(){
 gulp.start('images', 'icons', 'styles', 'scripts', 'updateHtml');
});

// watchFiles task
// watch for changes to html, image files, scss and js files
// when a change is detected run appropriate task
// once done with a task, reload server
gulp.task('watchFiles', function() {
  gulp.watch(options.src + '/index.html', function(){
    gulp.task('updateHtml')
        .pipe(connect.reload());
   });
  gulp.watch(options.src + '/images/**/**', function(){
    gulp.task('images')
        .pipe(connect.reload());
   });
   gulp.watch(options.src + '/icons/**/**', function(){
     gulp.task('icons')
         .pipe(connect.reload());
    });
  gulp.watch(options.src + '/sass/**/*.scss', function(){
    gulp.task('styles')
        .pipe(connect.reload());
   });
  gulp.watch(options.src + '/js/**/*.js', function(){
    gulp.task('scripts')
        .pipe(connect.reload());
   });
})

//setting up a task to start a web server with livereload
gulp.task('runServer', ['build','watchFiles'], function() {
  connect.server({
    root: './dist',
    livereload: true,
    port: 3000
  });
});

// default task
// and then run serve task
gulp.task("default", ["runServer"]);
