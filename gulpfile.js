
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

// optimize and/or compress asset files, images and icons for distribution
// hadnt actually found a gulp module for this one yet...
// for now were just copying the files to /dist
// overwrite if any already exist
// call using gulp.task("images");

function images() {
  return gulp.src([ './src/images/*.jpg', './src/images/*.png'])
            .pipe(gulp.dest(`./dist`));
}

images.description = `optimize images files, copy to /dist folder`;

// compile sass into css,
// copy to /dist/css folder,
// save global.css and map.css
// call using gulp.task('compileSass');

function compileSass() {
  return gulp.src(`./src/sass/global.scss`)
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest(`./dist/css`));
}

compileSass.discription = `using build ref, compile sass into css, a map file, copy to /dist/css folder`;

// prep SASS files for distribution
// run compileSass
// use build refs found in index.html
// concat and minify all css
// copy to /dist folder and overwrite if any exist
// call using gulp.task('styles',['compileSass']);

function minifyCSS() {
  return gulp.src('./src/index.html')
    .pipe(useref())
    .pipe(iff('*.css', csso()))
    .pipe(gulp.dest(`./dist`));
}

minifyCSS.description = `using build ref, run compileSass, map and minify, copy to /dist folder`;

function styles(){
  return gulp.series(compileSass, minifyCSS);
}

styles.description = `run compileSass and minifyCSS functions`;
// prep JavaScript files for distribution
// run compileSass
// use build refs found in index.html
// concat and minify all js
// copy to /dist folder and overwrite if any exist
// call using gulp.task("scripts");

function scripts() {
  gulp.src('./src/index.html')
    .pipe(useref())
    .pipe(iff('*.js', uglify()))
    .pipe(gulp.dest(`./dist`));
}

scripts.description = `using build ref, minify, map and copy js files to /dist folder`;

// in case any changes to src/index.html
// can run this task copy to /dist, overwrite if /dist/index.html exists
// call using gulp.task("updateHTML");

function updateHTML() {
  return gulp.src([ './src/images/index.html'])
            .pipe(gulp.dest(`/dist`));
}

updateHTML.description = `update /dist version of html`;

// build task, compileSass tasks first
// then run other tasks to prep src files for distribution
// call using gulp.task("build",  ['clean', 'images']);

function build() {
  gulp.series(clean, compileSass, styles, gulp.parallel(updateHTML, scripts, images));
}

build.description = `run all /dist prep tasks`;

// watchFiles task
// watch for changes to html, image files, scss and js files
// when a change is detected run appropriate task
// call using gulp.task('watchFiles');

function watchFiles() {
  gulp.watch('./src/index.html', updateHTML);
  gulp.watch('./src/images/**/**', images);
  gulp.watch('./src/sass/**/*.scss', styles);
  gulp.watch('./src/js/**/*.js', scripts);
}

watchFiles = `watch for change to any src files, if so, run respective dist prep task`;

// a server task
// runs the build task
// runs watchFiles task
// start a server
// if watchFiles runs any tasks, server should be restarted
// TODO: place server function declaration here ...


// remove the /dist folder and everything in it
// call using gulp.task('clean');

function clean() {
  return del([`./dist`]);
}

clean.description = `remove the /dist folder and everything in it`;

// declaring tasks that can called from the commandline
// usage: gulp exportedFunctionName
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watchFiles = watchFiles;
exports.build = build;

// default task
// TODO: for now is the build task, but will be server live-reload task
gulp.task("default", build);
