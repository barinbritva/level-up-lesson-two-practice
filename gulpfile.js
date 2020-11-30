const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const sassCompiler = require('node-sass');
const del = require('del');
// const webpack = require('webpack-stream');
// const webpackCompiler = require('webpack');
// const webpackConfig = require('./webpack.config');
const buildScripts = require('./tasks/build-scripts');
const paths = require('./tasks/paths');
const {isDevelopment} = require('./tasks/utils');

sass.compiler = sassCompiler;

function minifyImages() { 
    return gulp.src(paths.images.src)
        .pipe(changed(paths.images.dist))
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(paths.images.dist));
}

function compileStyles() {
    return gulp.src(paths.styles.src)
    .pipe(
        sass({outputStyle: isDevelopment() ? 'nested' : 'compressed'})
        .on('error', sass.logError)
    )
    .pipe(gulp.dest(paths.styles.dist));
}

function copyVendorStyles() {
    return gulp.src(paths.vendorStyles.src)
    .pipe(gulp.dest(paths.vendorStyles.dist));
}

function copyFonts() {
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist));
}

// function buildScripts() {
//     return gulp.src(paths.scripts.src)
//     .pipe(webpack(
//         webpackConfig,
//         webpackCompiler,
//         function(error) {
//             if (error) {
//                 console.error(error);
//             }
//         }
//     ))
//     .pipe(gulp.dest(paths.scripts.dist));
// }

function clean() {
    return del([paths.images.dist, paths.styles.dist, paths.fonts.dist, paths.scripts.dist]);
}

function watch() {
    gulp.watch(paths.images.src, gulp.parallel(minifyImages));
    gulp.watch(paths.styles.src, gulp.parallel(compileStyles));
    gulp.watch(paths.vendorStyles.src, gulp.parallel(copyVendorStyles));
    gulp.watch(paths.fonts.src, gulp.parallel(copyFonts));
    // gulp.watch(paths.scripts.src, gulp.parallel(buildScripts));
}


let build;
if ((isDevelopment())) {
    build = gulp.series(
        clean,
        gulp.parallel(minifyImages, compileStyles, copyVendorStyles, copyFonts, buildScripts),
        watch
    );
} else {
    build = gulp.series(
        clean,
        gulp.parallel(minifyImages, compileStyles, copyVendorStyles, copyFonts, buildScripts),
    );
}

module.exports = {
    minifyImages: minifyImages,
    compileStyles: compileStyles,
    copyVendorStyles: copyVendorStyles,
    copyFonts: copyFonts,
    buildScripts: buildScripts,
    clean: clean,
    watch: watch,
    default: build
}
