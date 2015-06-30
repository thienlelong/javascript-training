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
var gulp = require('gulp');

// path file config
var paths = {
    css: 'src/style/**/*.scss',
    cssOut: 'out/styles',
    cssOutWatch: 'out/styles/*.css',

    html: 'src/jade/*.jade',
    htmlWatch: 'src/jade/**/*.jade',
    htmlOut: 'out',
    htmlOutWatch: 'out/*.html',

    js: 'src/js/**/*.js',
    jsOut: 'out/js',
    jsOutWatch: 'out/js/*.js',

    assetImages: 'src/images/*.*',
    assetImagesOut: 'out/images',

    vender: 'src/files/vender/'
};

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

// build jade code to html
gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    gulp.src(paths.html)
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest(paths.htmlOut));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(paths.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.cssOut));
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths.cssOut));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.js, ['jshint', 'scripts']);
    gulp.watch(paths.css, ['sass']);
    gulp.watch(paths.htmlWatch, ['jade']);
});

// Default Task
gulp.task('default', ['server', 'jshint', 'sass', 'scripts', 'watch','jade']);