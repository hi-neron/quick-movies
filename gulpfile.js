'use strict'

let gulp = require('gulp')
let browserSync = require('browser-sync')
let sass = require('gulp-sass')
let imagemin = require('gulp-imagemin')

let webpack = require('webpack-stream')
let conf = require('./webpack.config')

let server = browserSync.create();

let paths = {
  scripts: {
    html: 'src/*.html',
    js: 'src/js/*.js',
    libs: 'src/js/libs/*.js',
    images: 'src/img/*',
    sass: 'src/scss/*.scss',
    sassLibs: 'src/scss/*/*.scss',
    dest: 'public/'
  }
};


function html () {
  return gulp.src(paths.scripts.html)
    .pipe(gulp.dest(paths.scripts.dest));
}



function style() {
  return (
    gulp.src(paths.scripts.sass)
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(gulp.dest(paths.scripts.dest + 'css/'))
  );
}

function images() {
  return (
    gulp.src(paths.scripts.images)
      .pipe(imagemin())
      .pipe(gulp.dest(paths.scripts.dest + 'img/'))
  );
}

function js() {
  return (
    gulp.src(paths.scripts.js)
      .pipe(webpack(conf))
      .pipe(gulp.dest(paths.scripts.dest + 'js/'))
  );
}

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './public'
    }
  });
  done();
}

let watch = () => gulp.watch([paths.scripts.html, paths.scripts.sass, paths.scripts.sassLibs, 'src/assets/scss/components/*.scss', 'src/assets/scss/guidelines/*.scss', paths.scripts.js, paths.scripts.libs, paths.scripts.images], gulp.series(html, style, js, images, reload));

let dev = gulp.series(serve, watch);
exports.default =  dev;
