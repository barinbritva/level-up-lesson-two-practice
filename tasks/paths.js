const paths = {
    images: {
        src: 'static/img/**/*.{jpg,jpeg,png,svg}',
        dist: 'public/img'
    },
    styles: {
        src: 'static/css/**/*.scss',
        dist: 'public/css'
    },
    vendorStyles: {
        src: 'static/css/**/*.css',
        dist: 'public/css'
    },
    fonts: {
        src: 'static/webfonts/**/*.{eot,svg,ttf,woff,woff2}',
        dist: 'public/webfonts',
    },
    scripts: {
        src: 'src/main.ts',
        distFile: 'main.js',
        dist: 'public/js'
    }
};

module.exports = paths;
