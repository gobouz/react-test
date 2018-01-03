'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let minify = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let changed = require('gulp-changed');

// const SCSS_PATH = './src/assets/scss/**/*.scss';
const SCSS_PATH = './src/assets/scss/app.scss';
const CSS_PATH = './src/assets/css';

gulp.task('css', function () {
    gulp.src(SCSS_PATH)
        .pipe(sass().on('error', sass.logError))
        .pipe(minify())
        .pipe(rename({suffix: '.min'}))
        .pipe(changed(CSS_PATH))
        .pipe(gulp.dest(CSS_PATH));
});

gulp.task('watch-files', function() {
    gulp.watch(SCSS_PATH, ['css']);
});

gulp.task('watch', ['build', 'watch-files']);

gulp.task('build', ['css']);

gulp.task('default', ['build']);