# Summary:

    Using Gulp to Build a Front-End Site

    In this project I was provided a website with
     HTML, SCSS, JPEGs, PNGs and JavaScript files.

    I set up a Gulp build process to
     prepare the website for deployment.

    I setup a  build process that meets to following criteria:

      Concatenate and minify the JavaScript files.
      Compile SCSS into CSS in a concatenated and minified file.
      Generate JavaScript and CSS source maps.
      Compress any JPEG or PNG files.
      All output for the build process is in the ./dist folder
       for distribution or deployment.

# CHANGES:

      I had everything fixed using Gulp v3.9.1
        except dependent tasks were still running when main task started
          for example: when the server started, the build task was still running
          also, the watchFiles task would start while the build was running
          which meant server would log missing files to console
          this was probably due to async nature of these tasks

          I could spend some time, figuring out promises in Gulp v3.9.1
          but using series in Gulp v4 makes this really easy

      so while migrating to Gulp 4 required a complete re-write
      it actually was simpler than I thought
        the code does the exact same thing...with NO bugs
        and... using WAY DIFFERENT syntax...

      for gulp.util deprecation in gulp v4 see:
        https://medium.com/gulpjs/gulp-util-ca3b1f9f9ac5
        breaking all modules that depend on it

      updated to latest for all other required gulp modules,
       I am using...
        latest version of NodeJs, NPM and Gulp v4.0.0
        also using latest version of the following modules
          del, gulp-concat, gulp-sass, gulp-sourcemaps, gulp-rename, gulp-uglify, gulp-csso
          these have fixed gulp.util vulnerabilities
           or have stopped using it
            in their latest version

      using gulp.connect to run a live-reload server

      had to switch from gulp-useref to gulp-concat
        gulp-useref does not seem to pick up the build tags in the html file
           instead the html file itself is copied over ... ???
           will have to research this and fix in future release of this project
        gulp-concat just takes file that match the path and glob pattern
           and basically strings these together
           then am passing result to gulp.dest to write to ./dist folder

      using gulp.imagemin for jpg and png compression
        despite moderate vulnerabilities due to gulp.util...
        it does work with gulp v4 and...
        for gulp image compression
        there really doesn't seem to be another stable, well supported module

# Wish list:

      would like to find a well supported image compression js module ...
        and make a gulp plugin out of it myself
        or perhaps, gulp-imagemin will address gulp-util vulnerabilties

      maybe gulp-useref will address the issue I found with build tags not working

# DONE:

    Migrated syntax work for Gulp v4

    Project Expectation and Extra Credit features complete and working

# Extra credit:

      The gulp default task has been setup to run ...
        a web server with live reload:
          - run the clean then build task,
          - a watchFiles task, monitoring src files for changes
          - a simple http development server, uses ./dist folder ar root
          - watchFiles may detect changes and runs associated tasks,
            if so, web server is restarted

# Project Expectations:    

    Setup build and development workflow using the following gulp tasks:

        styles
          - compiles sass into css
          - compiles map file for the sass locations of css styles
          - compresses css file
          - copies to ./dist folder
          - overwrites if exists

        scripts
          - concats js files into 1 js file
          - minifies the js src file, including latest version of jquery
          - copies to ./dist folder
          - overwrite if exists

        images
          - compresses images
          - copies images to dist folder
          - overwrites if exists

        icons
          - copies icons to dist folder
          - overwrites if exists

        updateHTML
          - copies src/index.html to dist/index.html
          - overwrites if exists

        watchFiles
          - runs above tasks in case changes to respective src files

        build
          - runs clean task
          - runs styles, scripts, images, and updateHtml tasks

        clean
          - dels ./dist folder and anything it

    Setup build process and development work-flow using:

        Lastest versions Node.js, NPM and Gulp v4.0.0

        Decided on gulp modules  
          - del - deletes files and folders
          - gulp-sass - compiles sass into css
          - gulp-sourcemaps - create a map, track styles to location in sass file
          - gulp-rename - rename files
          - gulp-uglify - minify js files
          - gulp-csso - minify css files
          - gulp-concat - string together multiple files
          - gulp-imagemin - compress jpeg and png files
          - gulp-connect - runs a web server with live-reload

    Prep for project:

        reviewed...
          project instructions and exceeds speqs.
          Gulp Basics course, Gulp UseRef workshop and SCRUM course
          and project files
