
"use strict";

// requiring needed modules
  const gulp = require('gulp'),
         del = require('del'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
        sass = require('gulp-sass'),
        maps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
         iff = require('gulp-if'),
        csso = require('gulp-csso'),
     connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin');

// vars for src and dist folder paths
const options = { src: 'src', dist: 'dist'};

// optimize and/or compress image files, images and icons for distribution
// most others dont have any where near the downloads or updates as gulp-imagemin
// copy to /dist folder, overwrite if any already exist
// call using gulp.task(images);

function images() {
  return gulp.src([ './src/images/*'])
            .pipe(imagemin())
            .pipe(gulp.dest(`./dist/content`))
            .pipe(connect.reload());
}

images.description = `optimize images files, copy to /dist folder`;

// copy icons to /dist folder, overwrite is exist

function icons() {
  return gulp.src([ './src/icons/*'])
            .pipe(gulp.dest(`./dist/icons`))
            .pipe(connect.reload());
}

icons.description = `copy icons to /dist folder, overwrite is exist`;


// prep Sass files for distribution
// compile sass into css
// minify the css
// compile a source map file
// copy to /dist/styles folder and overwrite if any exist
// call using gulp.task(styles);

function styles() {
  return gulp.src(`./src/sass/global.scss`)
      .pipe(maps.init())
      .pipe(sass())
      .pipe(concat('all.min.css'))
      .pipe(iff('*.css', csso()))
      .pipe(maps.write('./'))
      .pipe(gulp.dest(`./dist/styles`))
      .pipe(connect.reload());
}

styles.description = `compile sass, minify css and compile a map file, copy to /dist/scripts folder`;

// prep JavaScript files for distribution
// run compileSass
// use build refs found in index.html
// concat and minify all js into all.min.js
// and compile an all.min.js.map
// copy to /dist/scripts folder and overwrite if any exist
// call using gulp.task(scripts);

function scripts() {
  return gulp.src('./src/js/**/*.js')
    .pipe(maps.init())
    .pipe(concat('all.min.js'))
    .pipe(maps.write('./'))
    .pipe(iff('*.js', uglify()))
    .pipe(gulp.dest(`./dist/scripts`))
    .pipe(connect.reload());
}

scripts.description = `using build ref, minify, map and copy js files to /dist/scripts folder`;

// in case any changes to src/index.html
// can run this task copy to /dist, overwrite if /dist/index.html exists
// call using gulp.task(updateHTML);

function updateHTML() {
  return gulp.src([ './src/index.html'])
    .pipe(gulp.dest(`./dist`))
    .pipe(connect.reload());
}

updateHTML.description = `update /dist version of html`;

// build task, run these task 1 after the other
// waiting for each to complete before continuing
// clean task is the only task that be completed before the others begin

var build = gulp.series(clean, styles, scripts, images, icons, updateHTML);

// build.description = `run all /dist prep tasks`;

// watchFiles task
// watch for changes to html, image files, scss and js files
// when a change is detected run appropriate task
// call using gulp.task('watchFiles');

function watchFiles(done) {
  gulp.watch('./src/index.html', updateHTML);
  gulp.watch('./src/icons/**/**', icons);
  gulp.watch('./src/images/**/**', images);
  gulp.watch('./src/sass/**/*.scss', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  done();
}

watchFiles.description = `watch for change to any src files, if so, run respective dist prep task`;

// start a web server
// using the dist folder as root
// livereload enabled
function runServer(done) {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 3000
  });
  done();
};

runServer.description = `start a web server with ./dist as root`;

// using series to run a build then a web server, then watchFiles
// reloads the webserver when any '/dist' files are changed
var liveReloadServer = gulp.series(build, runServer, watchFiles);

// remove the /dist folder and everything in it
// call using gulp.task('clean');
function clean() {
  return del([`./dist`]);
}

clean.description = `remove the /dist folder and everything in it`;

// declaring tasks that can called from the commandline
// usage: gulp exportedFunctionName
exports.icons = icons;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.updateHTML = updateHTML;
exports.watchFiles = watchFiles;
exports.clean = clean;
exports.build = build;
exports.liveReloadServer = liveReloadServer;
exports.runServer = runServer;

// default task
// TODO: for now is the build task, but will be server live-reload task
gulp.task("default", liveReloadServer);
