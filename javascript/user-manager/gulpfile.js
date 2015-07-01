var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var googleWebFonts = require('gulp-google-webfonts');
var gulp = require('gulp');

// path file config
var paths = {
    css: 'src/style/**/*.scss',
    cssOut: 'out/styles',
    cssOutWatch: 'out/styles/*.css',

    html: ['src/layouts/*.jade','src/layouts/templates/*.jade'],
    htmlWatch: 'src/layouts/**/*.jade',
    htmlOut: 'out',
    htmlOutWatch: 'out/*.html',

    js: 'src/js/**/*.js',
    jsOut: 'out/js',
    jsOutWatch: 'out/js/*.js',

    images: 'src/images/*.*',
    imagesOut: 'out/images',

    vender: 'src/files/vender/'
};

var pathsLibraryJs = [
    paths.vender + 'jquery/dist/jquery.js',
    paths.vender + 'bootstrap-sass/assets/javascripts/bootstrap.js',
    paths.vender + 'bootstrap-sass/assets/javascripts/bootstrap-sprockets.js'    
];

// server task
gulp.task('server', [], function() {
    browserSync({
        notify: false,
        server: {
            baseDir: './out'
        },
        port: 8000
    });

    gulp.watch([paths.htmlOutWatch], browserSync.reload);
    gulp.watch([paths.jsOutWatch], browserSync.reload);
    gulp.watch([paths.cssOutWatch], browserSync.reload);
});

// Jshint Task
gulp.task('jshint', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(paths.js)
        .pipe(concat('all-script.js'))
        .pipe(gulp.dest(paths.jsOut))
        .pipe(rename('all-script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsOut));
});

// Compile Our Jade to html
gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    gulp.src(paths.html)
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest(paths.htmlOut));
});

// Compile Our Sass to css
gulp.task('sass', function() {
    return gulp.src(paths.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.cssOut))
        .pipe(minifyCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths.cssOut));
});

// Compile Our Sass to css
gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.imagesOut));
});

// concat all js on library
gulp.task('jsLibrary', function() {
    return gulp.src(pathsLibraryJs)
        .pipe(concat('library.js'))
        .pipe(uglify())
        .pipe(rename('library.min.js'))
        .pipe(gulp.dest(paths.jsOut))
        .on('error', gutil.log);
});




gulp.task('fonts', function () {
    return gulp.src('src/fonts/fonts.list')
        .pipe(googleWebFonts())
        .pipe(gulp.dest('out/fonts'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.js, ['jshint', 'scripts']);
    gulp.watch(paths.css, ['sass']);
    gulp.watch(paths.htmlWatch, ['jade']);
});

// Default Task
gulp.task('default', ['server', 'jshint', 'sass', 'scripts',
                        'watch','jade', 'jsLibrary', 'fonts', 'images']);