// Load plugins
var           gulp = require('gulp'),                      // 基础库
              sass = require('gulp-sass'),                 // SCSS
      autoprefixer = require('gulp-autoprefixer'),         // aotuprefixer
         minifycss = require('gulp-minify-css'),           // 压缩 css
            jshint = require('gulp-jshint'),               // JS 检查
            uglify = require('gulp-uglify'),               // JS 压缩混淆
            rename = require('gulp-rename'),               // 重命名
            concat = require('gulp-concat'),               // 合并文件
        livereload = require('gulp-livereload'),           // 自动刷新
        sourcemaps = require('gulp-sourcemaps'),           // 生成 JS 信息文件
             babel = require('gulp-babel'),                // babel
               rev = require('gulp-rev'),                  // rev
      revCollector = require('gulp-rev-collector'),        // rev-collector
               del = require('del'),                       // del
               md5 = require('md5'),                       // MD5
                fs = require('fs'),                        // FS
             iconv = require('iconv-lite'),                // iconv-lite
           webpack = require('gulp-webpack'),              // webpack
              args = require('yargs').argv,
            gulpif = require('gulp-if'),
//            crypto = require('crypto-js'),                 // 加密库
           fileMd5 = md5(new Date());                      // fileMD5

var isBuild = args.env === 'build';

if(isBuild) {
    var  pathEntry = './src',
         pathBuild = './build/' + fileMd5;
} else {
    var  pathEntry = './src',
         pathBuild = './build';
}

// Scripts
gulp.task('scripts', function() {
    var config = {
        mangle: {except: ['define', 'require', 'module', 'exports']},
        compress: false
    };
    gulp.src(pathEntry + '/scripts/*.js')
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe( gulpif(isBuild, sourcemaps.init()) )
        .pipe( gulpif(isBuild, babel()) )
        .pipe( gulpif(isBuild, gulp.dest(pathBuild + '/scripts')) )
        .pipe( gulpif(isBuild, rename({ suffix: '.min' })) )
        .pipe( gulpif(isBuild, uglify(config)) )
        .pipe( gulpif(isBuild, sourcemaps.write('.')) )
        .pipe(gulp.dest(pathBuild + '/scripts'));
});
// Libs
gulp.task('libs', function() {
    gulp.src(pathEntry + '/libs/*.js')
        .pipe(gulp.dest(pathBuild + '/libs'));
});
// styles
gulp.task('styles', function() {
    gulp.src(pathEntry + '/styles/*.scss')
        .pipe( sass({ style: 'expanded'}) )
        .pipe( autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4') )
        .pipe( gulpif(isBuild, sourcemaps.init()) )
        .pipe( gulpif(isBuild, minifycss()) )
        .pipe( gulpif(isBuild, sourcemaps.write('.')) )
        .pipe( gulp.dest(pathBuild + '/styles') );
});
// Images
gulp.task('images', function() {
    gulp.src(pathEntry + '/images/**/*')
        .pipe( gulp.dest(pathBuild + '/images') );
});

// Clean
gulp.task('clean', function(cb) {
    del([pathBuild + '/styles', pathBuild + '/images', pathBuild + '/scripts'], cb());
});

// Default task
gulp.task('default',['clean'], function(cb) {
    gulp.start('styles', 'images', 'scripts', 'libs');
});

// Watch
gulp.task('watch', function() {
    gulp.watch(pathEntry + '/styles/**/*.scss', ['styles']);
    gulp.watch(pathEntry + '/images/**/*', ['images']);
    gulp.watch(pathEntry + '/scripts/**/*.js', ['scripts']);
    gulp.watch(pathEntry + '/libs/**/*.js', ['libs']);

    livereload.listen();
    gulp.watch([pathBuild + '/**']).on('change', livereload.changed);
});

