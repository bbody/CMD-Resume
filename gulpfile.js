/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    qunit = require('gulp-qunit'),
    uglify = require('gulp-uglify'),
	pump = require('pump'),
	ghPages = require('gulp-gh-pages'),
	rename = require('gulp-rename'),
    inject = require('gulp-inject-string'),
    htmlmin = require('gulp-htmlmin');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

gulp.task('build', ['jshint', 'test', 'compile:js', 'compile:html', 'inject-tag']);

gulp.task('deploy', ['build', 'gh-pages']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/javascript/**/*.js', ['jshint', 'test']);
});

gulp.task('test', function() {
    return gulp.src('./spec/index.html')
        .pipe(qunit());
});

gulp.task('compile:js', function (cb) {
  pump([
        gulp.src('js/*.js'),
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('compile:html', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});


gulp.task('inject-tag', function(){
    gulp.src('./dist/index.html')
        .pipe(inject.after('<body>', '<a href="https://github.com/bbody/CMD-Resume"><img style="position: absolute; top: 0; right: 0; border: 0; z-index: 100;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>'))
        .pipe(gulp.dest('dist'));
});

gulp.task('gh-pages', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
