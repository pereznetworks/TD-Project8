
"use strict";

// requiring needed modules
  const gulp = require('gulp'),
         del = require('del'),
<<<<<<< HEAD
    imagemin = require('gulp-imagemin'),
=======
      concat = require('gulp-concat'),
>>>>>>> migrate-to-gulp-v4
      rename = require('gulp-rename'),
        sass = require('gulp-sass'),
        maps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
<<<<<<< HEAD
      concat = require('gulp-concat'),
         iff = require('gulp-if'),
        csso = require('gulp-csso'),
     connect = require('gulp-connect');
=======
         iff = require('gulp-if'),
        csso = require('gulp-csso'),
     connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin');
>>>>>>> migrate-to-gulp-v4

// vars for src and dist folder paths
const options = { src: 'src', dist: 'dist'};

<<<<<<< HEAD
// remove the /dist folder and everything in it
 gulp.task('clean', function() {
   return del([options.dist, options.dist + '/css/global.css*', options.dist + '/js/app*.js*']);
 });

// compile sass into css,
// copy to /dist/css folder,
// save global.css and map.css
gulp.task('compileSass', function() {
  return gulp.src(`${options.src}/sass/global.scss`)
=======
// optimize and/or compress image files, images and icons for distribution
// most others dont have any where near the downloads or updates as gulp-imagemin
// copy to /dist folder, overwrite if any already exist
// call using gulp.task(images);

function images() {
  return gulp.src([ './src/images/*'])
            .pipe(imagemin())
            .pipe(gulp.dest(`./dist/images`))
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
// copy to /dist folder and overwrite if any exist
// call using gulp.task(styles);

function styles() {
  return gulp.src(`./src/sass/global.scss`)
>>>>>>> migrate-to-gulp-v4
      .pipe(maps.init())
      .pipe(sass())
      .pipe(concat('global.css'))
      .pipe(iff('*.css', csso()))
      .pipe(maps.write('./'))
<<<<<<< HEAD
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
  return gulp.src([options.src + '/css/**/*.css'])
      .pipe(concat('global.css'))
      .pipe(iff('*.css', csso()))
      .pipe(gulp.dest(`${options.dist}/css`));
});
=======
      .pipe(gulp.dest(`./dist/css`))
      .pipe(connect.reload());
}

styles.description = `compile sass, minify css and compile a map file, copy to /dist folder`;
>>>>>>> migrate-to-gulp-v4

// prep JavaScript files for distribution
// run compileSass
// use build refs found in index.html
// concat and minify all js
// copy to /dist folder and overwrite if any exist
<<<<<<< HEAD
gulp.task('scripts', function() {
  return gulp.src(options.src + '/js/**/*.js')
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
 return gulp.start('images', 'icons', 'styles', 'scripts', 'updateHtml');
});
=======
// call using gulp.task(scripts);

function scripts() {
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('global.js'))
    .pipe(iff('*.js', uglify()))
    .pipe(gulp.dest(`./dist/js`))
    .pipe(connect.reload());
}

scripts.description = `using build ref, minify, map and copy js files to /dist folder`;

// in case any changes to src/index.html
// can run this task copy to /dist, overwrite if /dist/index.html exists
// call using gulp.task(updateHTML);

function updateHtml() {
  return gulp.src([ './src/index.html'])
    .pipe(gulp.dest(`./dist`))
    .pipe(connect.reload());
}

updateHtml.description = `update /dist version of html`;

// build task, run these task 1 after the other
// waiting for each to complete before continuing
// clean task is the only task that be completed before the others begin

var build = gulp.series(clean, styles, scripts, images, icons, updateHtml);

// build.description = `run all /dist prep tasks`;
>>>>>>> migrate-to-gulp-v4

// watchFiles task
// watch for changes to html, image files, scss and js files
// when a change is detected run appropriate task
<<<<<<< HEAD
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
gulp.task('runServer', ['build'], function() {
  connect.server({
    root: './dist',
    livereload: true,
    port: 3000
  });
  gulp.start('watchFiles');
});

// default task
// and then run serve task
gulp.task("default", ["runServer"]);
=======
// call using gulp.task('watchFiles');

function watchFiles(done) {
  gulp.watch('./src/index.html', updateHtml);
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
exports.updateHTML = updateHtml;
exports.watchFiles = watchFiles;
exports.clean = clean;
exports.build = build;
exports.liveReloadServer = liveReloadServer;
exports.runServer = runServer;

// default task
// TODO: for now is the build task, but will be server live-reload task
gulp.task("default", liveReloadServer);
>>>>>>> migrate-to-gulp-v4
