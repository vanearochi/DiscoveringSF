var gulp = require('gulp'),
	gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  cssnano = require('gulp-cssnano'),
	jshint = require('gulp-jshint'),
  htmlmin = require('gulp-htmlmin'),
  connect = require('gulp-connect');

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


gulp.task('default', ['connect']);

