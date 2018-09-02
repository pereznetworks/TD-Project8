
"use strict";

// requiring needed modules
  const gulp = require('gulp'),
         del = require('del'),
      rename = require('gulp-rename'),
        sass = require('gulp-sass'),
        maps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      useref = require('gulp-useref'),
         iff = require('gulp-if'),
        csso = require('gulp-csso');

// vars for src and dist folder paths
const options = { src: 'src', dist: 'dist'};

// compile sass into css,
// copy to /dist/css folder,
// save global.css and map.css
// call using gulp.task('compileSass');

function compileSass() {
  return gulp.src(`${options.src}/sass/global.scss`)
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest(`${options.src}/css`));
});

compileSass.discription = `using build ref, compile sass into css, a map file, copy to /dist/css folder`;

// optimize and/or compress asset files, images and icons for distribution
// hadnt actually found a gulp module for this one yet...
// for now were just copying the files to /dist
// overwrite if any already exist
// call using gulp.task("images");

function images() {
  return gulp.src([ options.src + '/images/*.jpg', options.src + '/images/*.png', options.src + '/icons/**'], { base: './' + options.src })
            .pipe(gulp.dest(`${options.dist}`));
};

images.description = `optimize images files, copy to /dist folder`;

// prep SASS files for distribution
// run compileSass
// use build refs found in index.html
// concat and minify all css
// copy to /dist folder and overwrite if any exist
// call using gulp.task('styles',['compileSass']);

function styles() {
  gulp.src(options.src + '/index.html')
    .pipe(useref())
    .pipe(iff('*.css', csso()))
    .pipe(gulp.dest(`${options.dist}`));
};

styles.description = `using build ref, run compileSass, map and minify, copy to /dist folder`;

// prep JavaScript files for distribution
// run compileSass
// use build refs found in index.html
// concat and minify all js
// copy to /dist folder and overwrite if any exist
gulp.task("scripts");

function scripts() {
  gulp.src(options.src + '/index.html')
    .pipe(useref())
    .pipe(iff('*.js', uglify()))
    .pipe(gulp.dest(`${options.dist}`));
};

scripts.description = `using build ref, minify, map and copy js files to /dist folder`;

// in case any changes to src/index.html
// can run this task copy to /dist, overwrite if /dist/index.html exists
// call using gulp.task("updateHTML");

function updateHTML() {
  return gulp.src([ options.src + '/images/index.html'], { base: './' + options.src })
            .pipe(gulp.dest(`${options.dist}`));
};

updateHTML.description = `update /dist version of html`;

// remove the /dist folder and everything in it
// call using gulp.task('clean');

function clean() {
  del([options.dist, options.dist + '/css/global.css*', options.dist + '/js/app*.js*']);
};

clean.description = `remove the /dist folder and everything in it`;

// build task, compileSass tasks first
// then run other tasks to prep src files for distribution
// call using gulp.task("build",  ['clean', 'images']);

function build() {
  gulp.task('html');
  gulp.task('scripts');
  gulp.task('styles');
  gulp.task('assets');
};

build.description = `run all /dist prep tasks`;

// watchFiles task
// watch for changes to html, image files, scss and js files
// when a change is detected run appropriate task
// call using gulp.task('watchFiles');


function watchFiles() {
  gulp.watch(options.src + '/index.html', ['html']);
  gulp.watch(options.src + '/images/**/**', ['images']);
  gulp.watch(options.src + '/sass/**/*.scss', ['styles']);
  gulp.watch(options.src + '/js/**/*.js', ['scripts']);
};

watchFiles = `watch for change to any src files, if so, run respective dist prep task`;
// a server task
// runs the build task
// runs watchFiles task
// start a server
// if watchFiles runs any tasks, server should be restarted

// default task
// and then run serve task
gulp.task("default", ["build"]);
