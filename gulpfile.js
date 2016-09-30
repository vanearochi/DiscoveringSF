var gulp = require('gulp'),
	  gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
	  jshint = require('gulp-jshint'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create(),
    browserify = require('browserify');

gulp.task('htmlmin', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('jsmin', function(){
  return gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('cssmin', function(){
  return gulp.src('src/css/*.css')
  .pipe(cssnano())
  .pipe(gulp.dest('dist/css'));
});


gulp.task('default', function() {
  return gutil.log('Gulp is running!');
});

gulp.task('jshint', function(){
	return gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });
});



gulp.task('default', ['browser-sync', 'htmlmin', 'cssmin', 'jshint']);

