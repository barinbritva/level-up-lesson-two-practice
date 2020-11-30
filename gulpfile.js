const gulp = require('gulp');
const del = require('del');
const paths = require('./tasks/paths');
const {isDevelopment} = require('./tasks/utils');
const buildScripts = require('./tasks/build-scripts');
const minifyImages = require('./tasks/minify-images');
const compileStyles = require('./tasks/compile-styles');

function copyVendorStyles() {
    return gulp.src(paths.vendorStyles.src)
    .pipe(gulp.dest(paths.vendorStyles.dist));
}

function copyFonts() {
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist));
}

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
