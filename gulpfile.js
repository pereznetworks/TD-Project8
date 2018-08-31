/* test each task, install fixed version of module or replacement
  gulp.util deprecated in gulp v4
  https://medium.com/gulpjs/gulp-util-ca3b1f9f9ac5
  breaks all modules that depend on it
  see ./gulpUtildeps.txt
*/

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

// optimize and/or compress asset files, images and icons for production
// for now were just copying the files
gulp.task("assets", function() {
  return gulp.src([ options.src + '/images/**', options.src + '/icons/**'], { base: './' + options.src })
            .pipe(gulp.dest(`${options.dist}`));
});

// prep js and css files for production
// run compileSass
// use build refs found in index.html
// concat and minify all js and css
// copy to /dist folder
gulp.task('html', ['compileSass', 'assets'], function() {
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

// build task, same as html task
// but runs clean task first
gulp.task("build",  ['clean', 'compileSass', 'assets'], function() {
  gulp.src(options.src + '/index.html')
    .pipe(useref())
    .pipe(iff('*.js', uglify()))
    .pipe(iff('*.css', csso()))
    .pipe(gulp.dest(`${options.dist}`));
});

// watchFiles task
// watch for changes to scss and js files
// when changes found run compileSass or js task, respectively
gulp.task('watchFiles', function() {
  gulp.watch(options.src + '/sass/**/*.scss', ['html']);
  gulp.watch(options.src + '/js/**/*.js', ['html']);
})

// serve task
// when watchFiles task runs
// restart server
gulp.task('serve', ['html','watchFiles'], serve(options.dist));

// default task
// run clean task first
// and then run serve
gulp.task("default", ["serve"]);
