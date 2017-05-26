/*
 * Generated on 2015-10-19
 * generator-theteam v0.5.0
 * 
 *
 * Copyright (c) 2015 
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/**/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble:dev', 'wiredep']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      scripts: {
        files: ['<%= config.src %>/assets/js/*.js'],
        tasks: ['jshint:dev', 'copy:scripts']
      },
      styles: {
        files: ['<%= config.src %>/assets/sass/**/*.scss'],
        tasks: ['sass:dev', 'copy:styles']
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        middleware : function(connect) {
            return [
                connect().use(
                '/bower_components',
                connect.static('./bower_components')
                ),
                connect.static('./dist')
            ];
        }
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: 'default.hbs',
          layoutdir: '<%= config.src %>/templates/layouts',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: ['<%= config.src %>/templates/partials/**/*.hbs'],
          helpers: ['handlebars-helper-compose', 'handlebars-helper-md'],
          collections: ['home', 'brand-elements', 'print']
        },
        dev: {
            options: {          
                dev: true,
                prod: false
            },
            files: [{
                expand: true,
                cwd: '<%= config.src %>/templates/pages/',
                src: '**/*.hbs',
                dest: '<%= config.dist %>/'
            },
            {
                expand: true,
                cwd: '<%= config.src %>/content/',
                src: '**/*.hbs',
                dest: '.tmp'
            }
            ]
        },
        prod: {
            options: {
                dev: false,
                prod: true          
            },
            files: [{
                expand: true,
                cwd: '<%= config.src %>/templates/pages/',
                src: '**/*.hbs',
                dest: '<%= config.dist %>/'
            },
            {
                expand: true,
                cwd: '<%= config.src %>/content/',
                src: '**/*.hbs',
                dest: '.tmp'
            }
            ]
        }
    },

    copy: {
      options: {
        processContentExclude: ['.DS_Store', '.gitignore', '.sass-cache', 'node_modules', 'src/tests/**']
      },
      all: {
        files: [{
          expand: true,
          cwd: 'src/assets/',
          src: '**',
          dest: '<%= config.dist %>/assets/'
        }]
      },      
      images: {
        files: [
          {
            cwd: 'src/assets/images/',
            dest: '<%= config.dist %>/assets/images/',
            src: ['**/*.*'],
            expand: true,
            filter: 'isFile'
          }
        ]
      },
      fonts: {
        files: [
          {
            cwd: 'src/assets/fonts/',
            dest: '<%= config.dist %>/assets/fonts/',
            src: ['**/*.*'],
            expand: true,
            filter: 'isFile'
          }
        ]
      },
      styles: {
        files: [
          {
            cwd: 'src/assets/',
            dest: '<%= config.dist %>/assets/',
            src: ['sass/**/*.*', 'css/**/*.*'],
            expand: true,
            filter: 'isFile'
          }
        ]
      },
      scripts: {
        files: [
          {
            cwd: 'src/assets/js/',
            dest: '<%= config.dist %>/assets/js/',
            src: ['**/*.*'],
            expand: true,
            filter: 'isFile'
          }
        ]
      }
    },

    // image: compression
    imagemin: {
      build: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>',
          src: ['assets/images/**/*.{gif,jpg,png}'],
          dest: '<%= config.dist %>'
        }]
      }
    },

    // scripts: jshint
    jshint: {
      options: {
        browser: true,
        curly: true,
        devel: true,
        eqeqeq: true,
        evil: true,
        immed: true,
        indent: 4,
        regexdash: true,
        sub: true,
        trailing: true,
        unused: true,
        white: true,
        globals: {
          jQuery: true,
          modernizr: true
        },
        force: true
      },
      dev: {
        src: ['<%= config.src %>/assets/js/*.js']
      },
      gruntfile: {
        src: ['Gruntfile.js']
      }
    },

    prettify : {
      options : {
        condense: true,
        indent: 4
      },
      all: {
        expand: true,
        cwd: '<%= config.dist %>',
        ext: '.html',
        src: ['*.html'],
        dest: '<%= config.dist %>'
      }
    },

    sass: {
      options: {
        sourcemap: 'auto',
        trace: true,
        quiet: true,
        includePaths: [
          'bower_components/bourbon/app/assets/stylesheets',
          'bower_components/neat/app/assets/stylesheets'
        ] 
      },
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: '<%= config.src %>/assets/sass',
          src: ['**/*.scss'],
          dest: '<%= config.src %>/assets/css',
          ext: '.css'
        }]
      },
      prod: {
        options: {
          outputStyle: 'compressed'
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: '<%= config.src %>/assets/sass',
          src: ['**/*.scss'],
          dest: '<%= config.src %>/assets/css',
          ext: '.min.css'
        }]
      },
    },

    // verify lowercase filename
    verifylowercase: {
      all : {
        src: ['<%= config.src %>/**/*']
      }
    },

    wiredep: {
      task: {
        src: [
          '<%= config.dist %>/**/*.html', 
        ],
        options: {
            exclude: [ 'jquery' ],
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= config.dist %>/**/*.html',
      options: {
        dest: '<%= config.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs']             
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= config.dist %>/{,*/}*.html'],
      options: {
        assetsDirs: [
          '<%= config.src %>'
        ]
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>', '<%= config.src %>/assets/css/*.css']

  });

  grunt.loadNpmTasks('assemble');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Build: Dev
  grunt.registerTask('build:dev', [
    'clean',
    'verifylowercase',
    'sass:dev',
    'jshint:dev',
    'copy:all',
    'assemble:dev',
    'wiredep'
  ]);

  // Build: Prod
  grunt.registerTask('build:prod', [
    'clean',
    'verifylowercase',
    'imagemin',
    'sass:prod',
    'jshint:dev',
    'copy:all',
    'assemble:prod',
    'wiredep',
    'useminPrepare',
    'concat',
    'uglify',
    'usemin',
    'prettify'
  ]);  

  grunt.registerTask('serve', [
    'build:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('default', [
    'build:prod'
  ]);

};