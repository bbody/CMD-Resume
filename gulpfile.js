/* File: gulpfile.js */

// Dependancies
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    qunit = require('gulp-qunit'),
    uglify = require('gulp-uglify'),
	pump = require('pump'),
	ghPages = require('gulp-gh-pages'),
	rename = require('gulp-rename'),
    inject = require('gulp-inject-string'),
    webserver = require('gulp-webserver');

// Default Gulp task is develop
gulp.task('default', ['develop']);

// Task for development
gulp.task('develop', ['watch', 'serve'])

// Build the project
gulp.task('build', ['jshint', 'test', 'compile:js', 'copy:html', 'copy:json', 'copy:icon']);

// Build then deploy to Github Pages
gulp.task('deploy', ['build', 'gh-pages']);

// Serve the development copy
gulp.task('serve', ['serve:development'])

// JSHint the JavaScript files
gulp.task('jshint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Watch important files
gulp.task('watch', function() {
  gulp.watch(['js/*.js', 'index.html', 'spec/index.html', 'spec/js/*.js'], ['jshint', 'test']);
});

// Run Qunit Tests
gulp.task('test', function() {
    return gulp.src('./spec/index.html')
        .pipe(qunit());
});

// Minify and uglify JavaScript files
gulp.task('compile:js', function (cb) {
  pump([
        gulp.src('js/*.js'),
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
  );
});

// Copy HTML across (Also inject Github ribbon)
gulp.task('copy:html', function() {
  return gulp.src('index.html')
  	.pipe(inject.after('<body>', '<a href="https://github.com/bbody/CMD-Resume"><img style="position: absolute; top: 0; right: 0; border: 0; z-index: 100;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>'))
    .pipe(gulp.dest('dist'));
});

// Copy JSON files to dist
gulp.task('copy:json', function() {
  return gulp.src(['responses/*.json'])
        .pipe(gulp.dest('dist/responses'));
});

// Copy favicon to dist
gulp.task('copy:icon', function(){
	return gulp.src('favicon.ico')
		.pipe(gulp.dest('dist'));
});

// Serve the for development
gulp.task('serve:development', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true,
      fallback: 'index.html'
    }));
});

// Serve the Qunit test site
gulp.task('serve:test', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: "spec/",
      fallback: 'spec/index.html'
    }));
});

// Serve the dist environment
gulp.task('serve:dist', function() {
  gulp.src('./dist')
    .pipe(webserver({
      livereload: true,
      open: true,
      fallback: 'index.html'
    }));
});

// Push dist to Github Pages
gulp.task('gh-pages', function() {
  return gulp.src(['dist/**/*', 'dist/*'])
    .pipe(ghPages());
});
