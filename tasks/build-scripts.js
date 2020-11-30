const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
var watchify = require('watchify');
const paths = require('./paths');
const {isDevelopment} = require('./utils');

const browserifyWrapper = isDevelopment()
? watchify
: (browserify) => {
    return browserify;
}

const browserifyInstance = browserifyWrapper(
    browserify({
        basedir: ".",
        debug: isDevelopment(),
        entries: [paths.scripts.src],
        cache: {},
        packageCache: {},
    }).plugin(tsify)
);

if (isDevelopment()) {
    browserifyInstance.on('update', buildScripts);
}
browserifyInstance.on('log', console.log.bind(console));

function buildScripts() {
    // todo uglify
    return browserifyInstance
        .bundle()
        .pipe(source(paths.scripts.distFile))
        .pipe(gulp.dest(paths.scripts.dist));
}

module.exports = buildScripts;