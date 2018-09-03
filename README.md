# Summary:

    Using Gulp to Build a Front-End Site

    In this project you’ll be provided a website with
     HTML, SCSS, JPEGs, PNGs and JavaScript files.

    You’ll be required to set up a Gulp build process to
     prepare the website for deployment.

    The build process must fulfill the following criteria:

      Concatenate and minify the JavaScript files.
      Compile SCSS into CSS in a concatenated and minified file.
      Generate JavaScript and CSS source maps.
      Compress any JPEG or PNG files.
      All output for the build process should be in a dist folder
       for distribution or deployment.

# DOING:

      since gulp v4 is still the "next version'
        instead of merging with current master branch
            will make this branch 'next version' of this project 

# CHANGES for GULP v4:

      gulp.util deprecated in gulp v4
      https://medium.com/gulpjs/gulp-util-ca3b1f9f9ac5
      breaks all modules that depend on it

      no longer using gulp.serve, latest version and ...
       90% of all gulp 'server' modules still use gulp.util
       and have not fixed or addressed vulnerabilities

      updated to latest for all other required gulp modules,
       I am using...
        del, concat, sass, sourcemaps, rename, uglify, csso
          these have fixed gulp.util vulnerabilities
           or have stopped using it
            in their latest version

      using gulp.connect to run a live-reload server
      have switched task functions in gulpfile.js to gulp 4 syntax

      using gulp.imagemin for jpg and png compression
        for both master (gulp 3.9.1) and branch versions (gulp 4)
        despite moderate vulnerabilities due gulp.util...
        it does work with gulp v4 and...
        for gulp image compression
        there really doesn't seem to be another stable, well supported module

# DONE:

    In Gulp 4 branch, update gulp images task
      using gulp-imagemin
      compress images and font files for production

    Migrated to a branch of project to Gulp 4

    Project is complete and working for Gulp v3.9.1
         research gulp.util dedup issues

    Added jquery.min.js link to index.html and jquery.min.js to src files

    Make the serve task the default task

        gulp
          default task - runs serve task

    Setup 'live' development workflow

        gulp serve
          - runs build first
          - runs watchFiles first
          - using 'dist' folder root
          - runs a simple http development server
          - if watchFiles detects and runs associated tasks again
             restart server

    Setup build and workflow using gulp tasks:

        compileSass
          - compile sass into css

        assets
          - copy assets to dist folder

        html
          - run compileSass and assets tasks
          - concat, minify all css and js files then copy to dist folder

        watchFiles
          - run html in case changes to sass or js

        build
          - same as html task
          - but runs clean first

    Setup environment and gulpfile.js :

      - Node.js, NPM and Gulp
      - gulp modules  
        concat, sass, sourcemaps, rename, uglify, csso,
          gulp-useref and serve

    Prep for project:

      reviewed...
        project instructions and exceeds speqs.
        Gulp Basics course, Gulp UseRef workshop and SCRUM course
        and project files

    Will be going for Exceeds in this project
