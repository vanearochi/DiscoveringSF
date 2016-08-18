var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint');
//var $ = require('gulp-load-plugins')();

gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

gulp.task('jshint', function(){
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
//TODO: verify how does jshint works, minify everything at the end and reload automatically

// gulp.task('watch', function(){
// 	gulp.watch('js/script-main.js', ['jshint'])
// })