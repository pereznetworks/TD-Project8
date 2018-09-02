# NOTE:

    Currently switching to gulp v4 syntax and gulp modiules that have addressed gulp.util dedup issues
    
    Using Gulp pre-v4 is not recommeneded due to vulnerabilities in gulp.util, which is a core part of Gulp pre-v4
    
    see issue #1: migrate to gulp v4 
    

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

# DONE:  

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

    Setup build process and development work-flow using:

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

# DOING:

    do we need to add jQuery to the sites project files
      if so, can gulp check for latest jquery
        and place a min version of it in /dist/js folder
        and place link to in html folder?

    update gulp assets task
      compress images and font files for production

    review/verify what is needed for 'meets expectations' and 'exceeds'

# TODO:

    migrate to gulp v4
      need to update or replace anything that relies on gulp.util
      otherwise when cloning git repo and running straight npm install
        some stuff will be broken
