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
    exec = require('gulp-exec'),
    concat = require('gulp-concat'),
    jscs = require('gulp-jscs');

// Default Gulp task is develop
gulp.task('default', ['develop']);

// Task for development
gulp.task('develop', ['watch', 'build', 'serve']);

// Task for test
gulp.task('test', ['watch', 'build', 'serve:test']);

// Build the project
gulp.task('build', ['jscs:development', 'qunit-test', 'compile:development', 'jshint:development', 'copy:html', 'copy:json', 'copy:icon']);

gulp.task('build-gh-pages', ['jscs:development', 'jshint:development', 'qunit-test', 'compile:gh-pages', 'copy:html', 'copy:json', 'copy:icon']);

// Build then deploy to Github Pages
gulp.task('deploy', ['build-gh-pages', 'gh-pages']);

// Serve the development copy
gulp.task('serve', ['serve:development']);

gulp.task('release', ['jscs', 'compile:release:minified', 'compile:release', 'zip']);

gulp.task('test:e2e', function() {
    return gulp.src('wdio.conf.js').pipe(webdriver());
});

// JSHint the JavaScript files
gulp.task('jshint:development', function() {
  return gulp.src('./tmp/js/cmd-resume.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs:development', function(){
  return gulp.src(['js/helper-functions.js', 'js/cmd-resume.js'])
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
});

gulp.task('jscs', function(){
  return gulp.src('dist/cmd-resume.js')
    .pipe(jscs({fix: true}))
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'))
    .pipe(gulp.dest('tmp'));
});

// Watch important files
gulp.task('watch', function() {
  gulp.watch(['js/*.js', 'index.html', 'spec/index.html', 'spec/js/*.js'], ['jshint:development', 'qunit-test']);
});

// Run Qunit Tests
gulp.task('qunit-test', function() {
    return gulp.src('./spec/index.html')
        .pipe(qunit());
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
  return compiledCode('./dist', false, true, true);
});

gulp.task('compile:release', function(){
  return compiledCode('./dist', false, false, true);
});

gulp.task('compile:development', function(){
  return compiledCode('tmp/js', true, false, false);
});

gulp.task('compile:gh-pages', function(){
  return compiledCode('tmp/js', true, false, false);
});

gulp.task('zip', function(){
	return gulp.src('./dist/*.js')
        .pipe(zip('release.zip'))
        .pipe(gulp.dest('./dist'));
});

function getVersionString(){
	var versionInfo = '/* v' + getVersion() + ' of CMD Resume by Brendon Body */';
	return versionInfo;
}

function getVersion(){
	var json = JSON.parse(fs.readFileSync('./package.json'));
	return json.version;
}

function compiledCode(destination, lint, minified, versioned){
  var stream =  gulp.src(['js/helper-functions.js', 'js/cmd-resume.js'])
    .pipe(concat(minified ? 'cmd-resume.min.js' : 'cmd-resume.js'));

  if (lint){
    stream.pipe(inject.prepend("\n\"use strict\";\n\n/*globals jQuery:false */\n/*jslint browser:true */\n\n"))
  }

  stream.pipe(inject.prepend(";(function($){"))
    .pipe(inject.afterEach("\n", "  "))
    .pipe(inject.append("\n}(jQuery));"));
    

  if (versioned){
    stream.pipe(inject.prepend(getVersionString() + "\n"));
  }

  if (minified){
    stream.pipe(uglify());
  }

  return stream.pipe(gulp.dest(destination));
}
