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

    Extra credit:

      Setup 'live' development workflow

      gulp serve
          - runs build first
          - runs watchFiles first
          - using 'dist' folder root
          - runs a simple http development server
          - if watchFiles detects and runs associated tasks again
             restart server

   Project Expectations:

      Make the serve task the default task

        gulp default task
            - runs serve task
              runs web server with ./dist as root        

    Setup build and workflow using gulp tasks:

        styles
          - compile sass into css
          - create map file
          - compress css file
          - copy to ./dist folder

        scripts
          - concat js files into 1 js file
          - minify js file
          - copy to ./dist folder

        images
          - compress imags
          - copy assets to dist folder

        html
          - run compileSass and assets tasks
          - concat, minify all css and js files then copy to dist folder

        watchFiles
          - run html in case changes to sass or js

        build
          - same as html task
          - but runs clean first

        clean
          - del ./dist folder and anything it

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

    completed exceeds and expectations 

# TODO:

    make branch "next version" of this project
