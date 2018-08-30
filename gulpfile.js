"use strict";

const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      maps = require('gulp-sourcemaps'),
       del = require('del'),
    useref = require('gulp-useref'),
       iff = require('gulp-if'),
      csso = require('gulp-csso');

const options = { src: 'src', dist: 'dist'};

gulp.task('compileSass', function() {
  return gulp.src(options.src + "/scss/global.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest(options.src + '/css'));
});

gulp.task('watchFiles', function() {
  gulp.watch(options.src + '/scss/**/*.scss', ['compileSass']);
  gulp.watch(options.src + '/js/main.js', ['concatScripts']);
})

gulp.task('clean', function() {
  del([options.dist, options.dist + '/css/global.css*', options.dist + /'js/app*.js*']);
});

// for gulp v3, no useref.assets method
// also note the string interpolation needed for the gulp.dest()
gulp.task('html', ['compileSass'], () => {
  gulp.src(options.src + '/index.html')
    .pipe(useref())
    .pipe(iff('*.js', uglify()))
    .pipe(iff('*.css', csso()))
    .pipe(gulp.dest(options.dist));
});

gulp.task("build", ['html'], function() {
  return gulp.src([ options.src + "/images/**", options.src + "/icons/**"], { base: options.src + '/'})
            .pipe(gulp.dest(options.dist));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
