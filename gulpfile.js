
var gulp = require('gulp');

var browserify = require('browserify');
var buffer = require('gulp-buffer');
var del = require('del'); 
var fs = require('fs');
var handlebars = require('gulp-compile-handlebars');
var minify_css = require('gulp-minify-css')
var reactify = require('reactify'); 
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');

 
var paths = {
    css: ['src/css/application.css'],
    app_js: ['./src/js/application.jsx'],
    img: ['src/img/**/*'],
    js: ['src/js/**/*.js'],
};

gulp.task('clean', function(done) {
    return del(['build', 'dist'], done);
});
 
gulp.task('css', ['clean'], function() {
    return gulp.src(paths.css)
        .pipe(minify_css({processImport: true}))
        .pipe(gulp.dest('build/'));
});
 
gulp.task('js', ['clean'], function() {
    // Browserify/bundle the JS.
    return browserify(paths.app_js)
        .transform(reactify)
        .bundle()
        .pipe(source('application.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

gulp.task('version', ['css', 'js'], function (done) {
    return gulp.src(['build/*.css', 'build/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist/')) 
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/'));
});

gulp.task('img', ['clean'], function (done) {
    return gulp.src(paths.img)
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', ['version', 'img'], function () {
    var manifest = JSON.parse(fs.readFileSync('build/rev-manifest.json', 'utf8'));

    var handlebar_opts = {
        helpers: {
            assetPath: function (path, context) {
                return [context.data.root[path]].join('/');
            }
        }
    };

    return gulp.src('src/index.hbs.html')
        .pipe(handlebars(manifest, handlebar_opts))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.css, ['html']);
    gulp.watch(paths.js, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('default', ['watch', 'html', 'connect']);