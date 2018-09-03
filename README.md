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

    had to switch from gulp-useref to gulp-concat
      gulp-useref does not seem to pick up the build tags in the html file
        checked the syntax of build ref tags in html file,
         the build tags look correct, src and dest glob patterns look okay
         instead the html file itself is copied over ... ???
      with switch to gulp-concat
          gulp.src ( path and glob pattern )
          and basically pipe matching files
           to concat( desired name of concat'ed file )
           then to minifying and then to gulp.dest to write to ./dist folder
           everything works

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

        html
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

        Node.js, NPM and Gulp.
          - Using current version of each.

        Decided on gulp modules  
          - del - deletes files and folders
          - gulp-sass - compiles sass into css
          - gulp-sourcemaps - create a map, track styles to location in sass file
          - gulp-rename - rename files
          - gulp-uglify - minify js files
          - gulp-csso - minify css files
          - gulp-useref - based on build refs html tag, concat multiple files
          - gulp-imagemin - compress jpeg and png files
          - gulp-serve - runs a web server with live-reload

    Prep for project:

        reviewed...
          project instructions and exceeds speqs.
          Gulp Basics course, Gulp UseRef workshop and SCRUM course
          and project files

# PENDING:

    Submission Review

# TODO:

    "migrate to gulp v4" works fine with no bugs...
      - when Gulp 4 released as current version
      - make "migrate to gulp v4" current version of this project
      - making it v.1.1.0

    preserve current master branch
      - making it v.1.0.0  

    address issues unable to fix in 'migrate to Gulp v4' branch
    in Gulp v4,
        - gulp-imagemin works fine, but still uses gulp.util
          and has not addressed vulnerabilities
        - gulp-useref does not pick up the build refs tags in the html file  
          work-around is to use gulp-concat
          and point gulp.src to path and glob pattern for js and css files
        - get a better handle on Gulp v4 promises and parallel tasking
            can then streamline or break down some of the more involved tasks
            like the styles task
