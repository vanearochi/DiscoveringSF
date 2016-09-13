var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint');
//var $ = require('gulp-load-plugins')();

var ngrok = require('ngrok');
var connect = connect = require('gulp-connect')

gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(3000, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});

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


// gulp.task('ngrok-url', function(cb) {
//   return ngrok.connect(8080, function (err, url) {
//     site = url;
//     console.log('serving your tunnel from: ' + site);
//     cb();
//   });
// });
//TODO: verify how does jshint works, minify everything at the end and reload automatically

// gulp.task('watch', function(){
// 	gulp.watch('js/script-main.js', ['jshint'])
// })