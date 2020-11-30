const gulp = require('gulp');
const sass = require('gulp-sass');
const sassCompiler = require('node-sass');
const paths = require('./paths');
const {isDevelopment} = require('./utils');

sass.compiler = sassCompiler;

function compileStyles() {
    return gulp.src(paths.styles.src)
    .pipe(
        sass({outputStyle: isDevelopment() ? 'nested' : 'compressed'})
        .on('error', sass.logError)
    )
    .pipe(gulp.dest(paths.styles.dist));
}

module.exports = compileStyles;