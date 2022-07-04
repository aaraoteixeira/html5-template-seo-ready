// Gulp.js configuration
// modules
const gulp = require('gulp'),
    // Scripts
    deporder = require('gulp-deporder'),
    concat = require('gulp-concat'),
    terser = require('gulp-terser'),
    stripdebug = require('gulp-strip-debug'),
    // Styles
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    rename = require("gulp-rename"),
    // Watch
    watch = require('gulp-watch'),
    // Assets folders
    folder = {
        src: './assets/',
        build: './build/'
    };

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// JavaScript components optimization
gulp.task('scripts', function () {
    return gulp.src([folder.src + 'scripts/pages/**/*', folder.src + 'scripts/components/**/*'])
        .pipe(deporder())
        .pipe(concat('main.min.js'))
        .pipe(stripdebug())
        .pipe(terser())
        .pipe(gulp.dest(folder.build + 'scripts/'));
});

// Sass components optimization
gulp.task('styles', function () {
    return gulp.src(folder.src + 'styles/theme.scss')
        .pipe(sass())
        .pipe(autoprefixer({overrideBrowserslist: AUTOPREFIXER_BROWSERS}))
        .pipe(csso())
        .pipe(rename(function (path) {
            path.dirname = "styles/";
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest(folder.build))
});

// Run all tasks
gulp.task('run', gulp.series('scripts', 'styles'));

// Watch all tasks
gulp.task('watch', function () {
    // Watch for scripts changes
    gulp.watch(folder.src + 'scripts/**/*', gulp.series('scripts'));

    // Watch for styles changes
    gulp.watch(folder.src + 'styles/**/*', gulp.series('styles'));
});
