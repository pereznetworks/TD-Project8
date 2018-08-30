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

    Setup 'live' development workflow

     using watch tasks and gulp-serve 

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

        serve
          - run http development server
          - restart server if watchFiles is run

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

    do we need to add jQuery to the sites project files?

    update gulp assets task
      compress images and font files for production

    verify what is needed for 'meets expectations'

# TODO:

    migrate to gulp v4
      need to update or replace anything that relies on gulp.util
      otherwise when cloning git repo and running straight npm install
        some stuff will be broken
