/**
 *
 * GRUNT.JS
 *
 * Frontend build + process tasks.
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @see http://gruntjs.com
 *
 *
 * MANUAL DEPENDENCIES
 *  - Node.js and Node Package Manager - "brew install node"
 *  - Libsass - "brew install libsass"
 *  - Jekyll generator - "gem install jekyll"
 *  - SCSS linting - "gem install scss-lint" - https://github.com/causes/scss-lint
 *
 */


module.exports = function (grunt) {

    //Load all grunt tasks (load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns )
    require('load-grunt-tasks')(grunt);

    // Grunt Setup...
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'), // Packages are read in from here

        // SASS
        // Compile Sass files (in .scss format) into CSS files



        sass: {
            dist: {
                files: [{

                    expand: true,
                    cwd: 'app/sass', // sass folder
                    src: ['**/*.scss'],
                    dest: 'app/css',  // css dir
                    ext: '.css'

                }],
                options: {
                    //outputStyle: 'compressed',
                    sourceMap: 'source.map',
                    sourceComments: 'map',
                    precision: 12
                }
            }
            //prod: {
            //    files: [{
            //        'css/main.min.css': 'sass/app.scss',
            //        'css/fonts.min.css': 'sass/fonts.scss',
            //        'css/print.min.css': 'sass/print.scss',
            //        'css/ie/ie9.min.css': 'sass/ie/ie9.scss'
            //    }],
            //    options: {
            //        outputStyle: 'compressed',
            //        //sourceMap: '../source.map',
            //        //sourceComments: 'map',
            //        precision: 12
            //    }
            //}
        },

        // SCSS-LINT
        // Check Sass files for linting
        scsslint: {
            full: {
                files: [{
                    src: [
                        'app/sass/app.scss'
                    ]
                }],
                options: {
                    config: '.scss-lint-full.yml',
                    colorizeOutput: true
                }
            },
            light: {
                files: [{
                    src: [
                        'app/sass/app.scss'
                    ]
                }],
                options: {
                    config: '.scss-lint-light.yml',
                    colorizeOutput: true,
                    maxBuffer: 3000 * 1024
                }
            }
        },

        // CSS-LINT
        // Check outputted CSS for gross structural errors
        csslint: {
            strict: {
                src: ['app/css/*.css']
            },
            lax: {
                options: {
                    csslintrc: '.csslintrc'
                },
                src: ['app/css/app.css', 'app/css/app-blessed1.css']
            }
        },

        // BLESS
        // Counts the number of selectors used, and if they exceed 4096,
        // splits the file at that point and @imports the left over portions.
        // Gets around an Internet Explorer bug
        bless: {
            css: {
                options: {
                    cacheBuster: false,
                    logCount: true
                },
                files: {
                    'css/main.css': 'css/app-blessed1.css'
                }
            }
        },

        // REPLACE
        // Fixes https://github.com/sindresorhus/grunt-sass/pull/54
        // node-sass has a bug where it doesn't produce source files with
        // correct directory mappings. This Patches that error.

        replace: {
            sourcemap: {
                src: ['source.map'],
                dest: 'source.map',
                replacements: [{
                    from: 'app/',
                    to: ''
                }]
            },
            sass: {
                src: ['css/*.css'],
                dest: 'css/',
                replacements: [{
                    from: 'sourceMappingURL=source.map',
                    to: 'sourceMappingURL=../source.map'
                }]
            }
        },

        // CLEAN
        // Fixes https://github.com/sindresorhus/grunt-sass/pull/54
        // Deletes the extra mapping file produced by above bug

        clean: {
            sourcemap: ['css/source.map']
        },


        'jsdoc-ng': {
            dist: {
                src: ['js/**/*.js', 'README.md'],
                dest: 'docs/jsdoc',
                template: 'jsdoc-ng',
                options: {}
            }
        },





        // JEKYLL
        // Used to build up the Component Library as a static site for reference

        jekyll: {
            options: {
                src: 'component-library/source'
            },
            dev: {
                options: {
                    dest: 'component-library/docs',
                    config: 'component-library/_config.yml'
                }
            }

        },

        // WATCH
        // Continuously watch certain files and run previously-defined tasks upon detecting a change

        watch: {
            sass_to_css: {
                files: 'app/sass/**/*.scss',
                tasks: [
                    //'scsslint:light',
                    'sass'
                ]
            },
            //component_library: {
            //    files: ['component-library/source/**/*.html', 'component-library/source/**/*.css'],
            //    tasks: ['jekyll:dev']
            //},
            //css_linting: {
            //    files: ['css/main.css'],
            //    tasks: ['csslint:lax'],
            //    options: {
            //        debounceDelay: 4000
            //    }
            //},
            sourcemap_cleanup: {
                files: ['app/css/*.css'],
                tasks: ['replace', 'clean:sourcemap']
            }
        },


        // TESTING (e2e)
        // ------------------------------------

        // Protractor
        // @see - http://stackoverflow.com/questions/19066747/integrating-protractor-with-yeoman-via-grunt
        protractor: {
            options: {
                keepAlive: true,
                configFile: "tests/e2e/protractor.conf.js"
            },
            //singlerun: {},
            //auto: {
            //    keepAlive: true,
            //    options: {
            //        args: {
            //            seleniumPort: 4444
            //        }
            //    }
            //},
            run: {}
        },

        //// Protractor Webdriver
        //protractor_webdriver: {
        //    //options: {
        //    //    // Task-specific options go here.
        //    //    //keepAlive: true
        //    //},
        //    //default: {
        //    //
        //    //    // Target-specific file lists and/or options go here.
        //    //    //command: 'node ./node_modules/protractor/bin/webdriver-manager update --standalone --chrome',
        //    //    command: 'node ./node_modules/protractor/bin/webdriver-manager start'
        //    //}
        //
        //    start: {
        //        options: {
        //            path: './node_modules/protractor/bin/',
        //            command: 'webdriver-manager start',
        //        },
        //    },
        //},


        // TESTING (unit)
        // ------------------------------------

        // KARMA
        karma: {
            core: {
                configFile: 'karma.conf.js',
                runnerPort: 9999,
                singleRun: true,
                browsers: ['PhantomJS'],
                logLevel: 'INFO',
                background: false
            }

        },


    });



    // GRUNT RUNNER
    // Set tasks to run at Grunt initial launch
    grunt.registerTask('build', [
        //'bless',
        //'scsslint:light', // needs time to cleanup
        'sass',
        //'csslint:lax',
        //'replace',
        //'clean:sourcemap',
        //'jekyll:dev'
    ]);

    grunt.registerTask('reports', [
        'build',
        'karma',
        'jsdoc-ng'
    ]);

    grunt.registerTask('test', [
        //'build',
        'karma',
        'protractor:run'
    ]);

    grunt.registerTask('test-dev', [
        //'build',
        'karma',
        'watch'
    ]);

    grunt.registerTask('default', [
        'build',
        //'test',
        'watch'
    ]);


};