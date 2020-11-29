const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const del = require('del');

const paths = {
    images: {
        src: 'static/img/**/*.{jpg,jpeg,png,svg}',
        dist: 'public/img'
    }
};

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
        .pipe(gulp.dest(paths.images.dist))
};

function clean() {
    return del([paths.images.dist]);
};

function watch() {
    gulp.watch(paths.images.src, gulp.parallel(minifyImages));
}

const build = gulp.series(clean, gulp.parallel(minifyImages));

exports.minifyImages = minifyImages;
exports.clean = clean;
exports.watch = watch;
exports.default = build;
