/***
 *
 * GULPJS FILE v.0.1
 *
 * @author Mark Rushton <mark@modernfidelity.co.uk>
 *
 * @file
 * This is the config file
 *
 *
 * @type {*|exports|module.exports}
 *
 */

// LOAD DEPS
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    imageop = require('gulp-image-optimization'),
    gzip = require('gulp-gzip'),
    minifyHTML = require('gulp-minify-html'),
    sourcemaps = require('gulp-sourcemaps');


// WATCH
gulp.task('watch', function () {

    gulp.watch('./app/sass/**/*.scss', ['sass']);
    gulp.watch([
        './app/site/components/**/*.js',
        './app/site/shared/**/**/*.js',
        './app/app.js'],
        ['js']
    );
    //gulp.watch(['./app/app.js'], ['compress']);

});


// IMAGES
gulp.task('images', function (cb) {
    gulp.src([
        'app/img/gallery_src/*.png',
        'app/img/gallery_src/*.jpg',
        'app/img/gallery_src/*.gif',
        'app/img/gallery_src/*.jpeg'
    ]).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('app/img/gallery')).on('end', cb).on('error', cb);
});

// CSS & SASS
gulp.task('sass', function () {
    gulp.src([
            './app/sass/**/*.scss',
            './app/sass/**/**/*.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        //.pipe(minifyCSS())
        //.pipe(sourcemaps.write('source-maps'))
        //.pipe(rename('build.css'))
        .pipe(gulp.dest('./app/css/'));
});

// JAVASCRIPT (@todo : move this to * syntax with exclude)
gulp.task('js', function () {

    return gulp.src([

            // VENDOR
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/slick-carousel/slick/slick.js',
            'app/bower_components/angular-slick/dist/slick.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'app/bower_components/angularUtils-pagination/dirPagination.js',
            'app/bower_components/react/react.js',
            'app/bower_components/react/react-dom.js',
            'app/bower_components/react/JSXTransformer.js',
            'app/bower_components/ngReact/ngReact.min.js',

            // CUSTOM
            'app/site/api/api.js',
            'app/site/components/about/about.js',
            'app/site/components/contact/contact.js',
            'app/site/components/frontpage/frontpage.js',
            'app/site/components/news/news.js',
            'app/site/components/pre-owned/pre-owned.js',
            'app/site/components/search/search.js',
            'app/site/components/uvl/uvl.js',
            'app/site/components/vdp/vdp.js',

            // SHARED
            'app/site/shared/directives/mobile-menu/mobile-menu.js',

            // React
            'app/site/components/react/react.js',
            'app/site/components/react-table/react-table.js',


            'app/app.js'

        ])
        .pipe(concat('build.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./app/'));

});

// COMPRESSION
gulp.task('compress', function () {
    gulp.src('./app/build.js')
        .pipe(gzip())
        .pipe(rename('build.js.jgz'))
        .pipe(gulp.dest('./app'));
});


// HTML
gulp.task('html', function () {

    var opts = {
        conditionals: true,
        spare: true
    };

    return gulp.src('./app/index.html')
        .pipe(minifyHTML(opts))
        .pipe(rename('build.html'))
        .pipe(gulp.dest('./app/'));
});


// TESTS
gulp.task('tests', ['unit', 'e2e']);

// DEFAULT
gulp.task('default', ['sass', 'js', 'compress', 'html', 'watch']);