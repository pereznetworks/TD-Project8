
# An Advanced Demo: Using Gulp to Build a Front-End Web-Site

- Using Gulp to Build a Front-End Site

- this was originally part of TeamTreehouse, Tech Degree, Full Stack JavaScript

- ***todo: will be adapting into a tutorial how-to project***

## To begin with

- In this project I was provided a website with

  - HTML, SCSS, JPEGs, PNGs and JavaScript files.

- I set up a Gulp build process to prepare the website for deployment.

- I setup a build process that meets to following criteria:

  - Concatenate and minify the JavaScript files.
  - Compile SCSS into CSS in a concatenated and minified file.
  - Generate JavaScript and CSS source maps.
  - Compress any JPEG or PNG files.
  - All output for the build process is in the ./dist folder for distribution or deployment.

## TO RUN THE GULP 4 TASKS FROM COMMAND-LINE:

- A the time Gulp was @ 4.0.0,
  - but some had may still have had older version of gul-cli installed globally

- Please make sure the local folder and global version of gulp-cli are the same

  - Run the following code :
    - to get the environment versions of gulp-cli in alignment with all packages that come with gulp.

    - `npm i -g gulp-cli`
- After that a simple `npm install`, should get everything else to work...

## CHANGES:

### Second Review

- Changed concatenated/minified js and css files tasks
  - so that the result is a file name all.min.js for javascript
  - and a file name all.min.css for css
  - these are copied to a scripts folder for javascript
  - and copied to styles folder for the compiled css

- A source map is compiled for the js and copied to the dist/scripts folder

- Compressed image files are now copied to a dist/content folder

- Changes to index.html so that images, scripts and styles can be loaded from the correct dist folders

### First Review

- Migrated to Gulp v4
  - I had everything fixed using Gulp v3.9.1
    - except dependent tasks were still running when main task started
  - for example: when the server started,
    - the build task was still running
      - which meant server would log missing files to console
      - this was probably due to async nature of these tasks
  - I could spend some time, figuring out promises in Gulp v3.9.1
    - but using series in Gulp v4 makes this really easy

- so while migrating to Gulp 4 required a complete re-write
  - it actually was simpler than I thought
    - the code does the exact same thing
      - with NO bugs
      - using WAY DIFFERENT syntax...
      - but some say it actually reads like cleaner JavaScript

- for gulp.util deprecation in gulp v4 see:
  - https://medium.com/gulpjs/gulp-util-ca3b1f9f9ac5
  - breaking all modules that depend on it
  - or spitting out all kinds of warnings regarding vulnerabilities

- updated to latest for all other required gulp modules,
  - latest version of NodeJs, NPM and Gulp v4.0.0
  - also using latest version of the following modules
    - del, gulp-concat, gulp-sass, gulp-sourcemaps, gulp-rename
    - and gulp-uglify, gulp-csso
  - these either fixed gulp.util vulnerabilities
    - or have stopped or were not using it
    - in their latest version

- using gulp.connect to run a live-reload server
  - at the time, gulp.server was problematic, since gulp.util issues had not been fixed yet
    - plus, I understand gulp.connect syntax better

- had to switch from gulp-useref to gulp-concat
  - gulp-useref does not seem to pick up the build tags in the html file
    - instead the html file itself is copied over ... ???
    - will have to research this and fix in future release of this project
  - gulp-concat works as expected and is easy to use

- using gulp.imagemin for jpg and png compression
  - despite moderate vulnerabilities due to gulp.util...
  - it does work with gulp v4 and...
  - for gulp image compression
    - there really doesn't seem to be another stable, well supported module

- added a separate icons task

## Wish list:

- would like to find a well supported image compression js module ...
  - and make a gulp plugin out of it myself
  - or perhaps, gulp-imagemin will address gulp-util vulnerabilties

- maybe gulp-useref will address the issue I found with build tags not working

## Milestones:

- Migrated code from Gulp v3.9.1 to work for Gulp v4
  - this was real headache, but worth the effort

- Project Requirements and Dev Server features complete and working

## Dev Server as part of Build process:

- The gulp default task has been setup to run ...
  - a web server with live reload:
    - run the clean then build task,
    - a watchFiles task, monitoring src files for changes
    - a simple http development server, uses ./dist folder as root
    - watchFiles may detect changes and runs associated tasks,
    - if so, web server is restarted

## Project Phases:    

### Prep for project:

- reviewed...
  - project instructions and exceeds speqs.
  - Gulp Basics course, Gulp UseRef workshop and SCRUM course
  - and project files


### Setup build process and development work-flow using:

- Lastest versions Node.js, NPM and Gulp v4.0.0

- Decided on gulp modules  
  - del - deletes files and folders
  - gulp-sass - compiles sass into css
  - gulp-sourcemaps - create a map, track styles to location in sass file
  - gulp-rename - rename files
  - gulp-uglify - minify js files
  - gulp-csso - minify css files
  - gulp-concat - string together multiple files
  - gulp-imagemin - compress jpeg and png files
  - gulp-connect - runs a web server with live-reload

### Setup build and development workflow using the following gulp tasks:

- styles
  - compiles sass into css
  - compiles map file for the sass locations of css styles
  - compresses css file
  - copies to ./dist folder
  - overwrites if exists

- scripts
  - concats js files into 1 js file
  - minifies the js src file, including latest version of jquery
  - copies to ./dist folder
  - overwrite if exists

- images
  - compresses images
  - copies images to dist folder
  - overwrites if exists

- icons
  - copies icons to dist folder
  - overwrites if exists

- updateHtml
  - copies src/index.html to dist/index.html
  - overwrites if exists

- watchFiles
  - runs above tasks in case changes to respective src files

- build
  - runs clean task
  - runs styles, scripts, images, and updateHtml tasks

- clean
  - dels ./dist folder and anything it

### Debug Build and QA Demo site

- debug build process

- access demo site to check js/css styling

- tweak js/sass
  - re-run build to see changes
