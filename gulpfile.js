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
    webserver = require('gulp-webserver'),
    fs = require('fs'),
    del = require('del'),
    zip = require('gulp-zip'),
    exec = require('gulp-exec');

// Default Gulp task is develop
gulp.task('default', ['develop']);

// Task for development
gulp.task('develop', ['watch', 'build', 'serve']);

// Task for test
gulp.task('test', ['watch', 'build', 'serve:test']);

// Build the project
gulp.task('build', ['jshint', 'qunit-test', 'compile:development', 'copy:html', 'copy:json', 'copy:icon']);

gulp.task('build-gh-pages', ['jshint', 'qunit-test', 'compile:gh-pages', 'copy:html', 'copy:json', 'copy:icon']);

// Build then deploy to Github Pages
gulp.task('deploy', ['build-gh-pages', 'gh-pages']);

// Serve the development copy
gulp.task('serve', ['serve:development']);

gulp.task('release', ['compile:release:minified', 'compile:release', 'zip']);

gulp.task('test:e2e', function() {
    return gulp.src('wdio.conf.js').pipe(webdriver());
});

// JSHint the JavaScript files
gulp.task('jshint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Watch important files
gulp.task('watch', function() {
  gulp.watch(['js/*.js', 'index.html', 'spec/index.html', 'spec/js/*.js'], ['jshint', 'qunit-test']);
});

// Run Qunit Tests
gulp.task('qunit-test', function() {
    return gulp.src('./spec/index.html')
        .pipe(qunit());
});

// Minify and uglify JavaScript files
gulp.task('compile:js', function (cb) {
  pump([
        gulp.src('js/*.js'),
        uglify(),
        gulp.dest('tmp/js')
    ],
    cb
  );
});

// Copy HTML across (Also inject Github ribbon)
gulp.task('copy:html', function() {
  return gulp.src('index.html')
  	.pipe(inject.after('<body>', '<a href="https://github.com/bbody/CMD-Resume"><img style="position: absolute; top: 0; right: 0; border: 0; z-index: 100;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>'))
    .pipe(gulp.dest('tmp'));
});

// Copy JSON files to tmp
gulp.task('copy:json', function() {
  return gulp.src(['responses/*.json'])
        .pipe(gulp.dest('tmp/responses'));
});

// Copy favicon to tmp
gulp.task('copy:icon', function(){
	return gulp.src('favicon.ico')
		.pipe(gulp.dest('tmp'));
});

// Serve the for development
gulp.task('serve:development', function() {
  gulp.src('./tmp')
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

// Push dist to Github Pages
gulp.task('gh-pages', function() {
  return gulp.src(['tmp/**/*', 'tmp/*'])
    .pipe(ghPages());
});

gulp.task('version', function(){
	return getVersion();
});

gulp.task('compile:release:minified', function(){
	return gulp.src(['js/cmd-resume.js', 'js/helper-functions.js'])
  		.pipe(uglify())
  		.pipe(rename("cmd-resume.min.js"))
  		.pipe(inject.prepend("\"use strict\";"))
  		.pipe(inject.prepend("(function($){"))
  		.pipe(inject.prepend(getVersionString()))
  		.pipe(inject.append("}(jQuery));"))
  		.pipe(gulp.dest('dist'));
});

gulp.task('compile:release', function(){
	return gulp.src(['js/cmd-resume.js', 'js/helper-functions.js'])
		.pipe(inject.prepend("\n\"use strict\";\n\n"))
  		.pipe(inject.afterEach("\n", "	"))
  		.pipe(inject.prepend("(function($){"))
  		.pipe(inject.prepend(getVersionString() + "\n\n"))
  		.pipe(inject.append("\n}(jQuery));"))
    	.pipe(gulp.dest('dist'));
});

gulp.task('compile:development', function(){
	return gulp.src(['js/cmd-resume.js', 'js/helper-functions.js'])
		.pipe(inject.prepend("\n\"use strict\";\n\n"))
  		.pipe(inject.afterEach("\n", "	"))
  		.pipe(inject.prepend("(function($){"))
  		.pipe(inject.prepend(getVersionString() + "\n\n"))
  		.pipe(inject.append("\n}(jQuery));"))
    	.pipe(gulp.dest('dist/js'));
});

gulp.task('compile:gh-pages', function(){
	return gulp.src(['js/cmd-resume.js', 'js/helper-functions.js'])
		.pipe(inject.prepend("\n\"use strict\";\n\n"))
  		.pipe(inject.afterEach("\n", "	"))
  		.pipe(inject.prepend("(function($){"))
  		.pipe(inject.prepend(getVersionString() + "\n\n"))
  		.pipe(inject.append("\n}(jQuery));"))
    	.pipe(gulp.dest('tmp/js'));
});

gulp.task('zip', function(){
	return gulp.src('dist/*.js')
        .pipe(zip('release-v' + getVersion() +'.zip'))
        .pipe(gulp.dest('dist'));
});

function getVersionString(){
	var versionInfo = '/* v' + getVersion() + ' of CMD Resume by Brendon Body */';
	return versionInfo;
}

function getVersion(){
	var json = JSON.parse(fs.readFileSync('./package.json'));
	return json.version;
}