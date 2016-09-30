var gulp = require('gulp'),
	gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  cssnano = require('gulp-cssnano'),
	jshint = require('gulp-jshint'),
  htmlmin = require('gulp-htmlmin'),
  connect = require('gulp-connect'),
  browserSync = require('browser-sync').create(),
  browserify = require('browserify')

gulp.task('htmlmin', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task("jsmin", function(){
  return gulp.src("js/*.js")
  .pipe(uglify())
  .pipe(gulp.dest("dist/js"))
})

gulp.task("cssmin", function(){
  return gulp.src('css/*.css')
  .pipe(cssnano())
  .pipe(gulp.dest('dist/css'))
})


gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

gulp.task('jshint', function(){
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('connect', function() {
  connect.server();
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['js'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("js/*.js", ['js-watch']);
});




gulp.task('default', ['connect']);

