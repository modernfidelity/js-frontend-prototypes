/**
 *
 * KARMA CONF v.0.2
 *
 * @file Setup file for the Karma test runner tool
 *
 */





// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {


    //var React = require('./app/bower_components/react/react.js');

    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [

            // Load all bower js modules
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/api-check/dist/api-check.js',
            'app/bower_components/angular-formly/dist/formly.js',
            'app/bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
            'app/bower_components/angular-slick/dist/slick.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'app/bower_components/angularUtils-pagination/dirPagination.js',
            //'app/bower_components/react/react.js',
            //'app/bower_components/react/react-dom.js',
            //'app/bower_components/react/JSXTransformer.js',
            //'app/bower_components/ngReact/ngReact.min.js',

            'app/app.js',

            'app/site/api/**/*.js',
            'app/site/components/**/*.js',
            'app/site/shared/**/*.js',

            'test/mock/**/*.js',
            'test/spec/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [

        ],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        //'browserName': 'phantomjs',
        //'phantomjs.binary.path': require('phantomjs').path,
        //'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--web-security=false']


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        // REPORTS
        // ------------------------

        reporters: ['spec', 'verbose', 'progress', 'coverage'],
        preprocessors: {
            'app/site/**/*.js': ['coverage']
        },
        coverageReporter: {
            // specify a common output directory
            dir: 'reports/coverage',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                // reporters supporting the `file` property, use `subdir` to directly
                // output them in the `dir` directory
                { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
                { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
                { type: 'text', subdir: '.', file: 'text.txt' },
                { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
            ]
        },

        junitReporter: {
            outputFile: 'reports/unit.xml',
            suite: 'unit'
        }

        //specReporter: {maxLogLines: 5},
        //plugins: ["karma-spec-reporter"],

    });
};
