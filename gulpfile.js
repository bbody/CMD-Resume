/* File: gulpfile.js */

// Dependancies
var gulp = require('gulp'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		inject = require('gulp-inject-string'),
		webserver = require('gulp-webserver'),
		concat = require('gulp-concat'),
		jscs = require('gulp-jscs'),
		Server = require('karma').Server,
		pug = require('gulp-pug');
let package = require('./package.json');

var TOOLS = ['karma.conf.js', 'gulpfile.js'];
var TESTS = ['spec/*-spec.js'];
var SOURCE = ['js/helper-functions.js', 'js/cmd-resume.js'];
var OUTPUT = ['./tmp/js/cmd-resume.js'];

// Useful functions
function getVersion() {
	var fs = require('fs');
	var json = JSON.parse(fs.readFileSync('./package.json'));
	return json.version;
}

function getVersionString() {
	var versionInfo = '/* v' + getVersion() +
		' of CMD Resume by Brendon Body */';
	return versionInfo;
}

function compiledCode(destination, minified, versioned) {
	var stream =  gulp.src(['js/helper-functions.js', 'js/cmd-resume.js'])
		.pipe(concat(minified ? 'cmd-resume.min.js' : 'cmd-resume.js'));

	stream.pipe(inject.prepend(';(function($){\n"use strict";\n\n'))
		.pipe(inject.afterEach('\n', '  '))
		.pipe(inject.append('\n}(jQuery));'));

	if (versioned) {
		stream.pipe(inject.prepend(getVersionString() + '\n'));
	}

	if (minified) {
		stream.pipe(uglify());
	}

	return stream.pipe(gulp.dest(destination));
}

// Default Gulp task is develop
gulp.task('default', ['develop']);

// Task for development
gulp.task('develop', ['watch', 'build', 'serve']);

// Task for test
gulp.task('test', ['watch', 'build', 'test:karma:build', 'coverage']);

// Build the project
gulp.task('build', ['compile:html',
	'compile:development', 'copy:json', 'copy:icon']);

gulp.task('release', ['compile:release:minified', 'compile:release']);

// Watch important files
gulp.task('watch', function() {
	gulp.watch(['js/*.js', 'index.html', 'spec/*.js', 'karma.conf.js'],
		['build']);
});

// Serve the for development
gulp.task('serve', function() {
	gulp.src('./')
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});

// Source code checking
gulp.task('source-check:development', ['jshint:development',
	'jscs:development']);

gulp.task('source-check:tools', ['jshint:tools', 'jscs:tools']);

gulp.task('source-check:tests', ['jshint:tests', 'jscs:tests']);

gulp.task('jshint:development', function() {
	return gulp.src(OUTPUT)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('jshint:tools', function() {
	return gulp.src(TOOLS)
		.pipe(jshint('./.jshintrc-tools'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('jshint:tests', function() {
	return gulp.src(TESTS)
		.pipe(jshint('./.jshintrc-tests'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('jscs:development', function() {
	return gulp.src(SOURCE)
		.pipe(jscs())
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));
});

gulp.task('jscs:tools', function() {
	return gulp.src(TOOLS)
		.pipe(jscs({configPath: './.jscsrc-tools'}))
		.pipe(jscs.reporter())
		.pipe(jscs.reporter());
});

gulp.task('jscs:tests', function() {
	return gulp.src(TESTS)
		.pipe(jscs({configPath: './spec/.jscsrc'}))
		.pipe(jscs.reporter())
		.pipe(jscs.reporter());
});

gulp.task('copy:example-script', function() {
	return gulp.src(['js/examples/example-script.js'])
				.pipe(gulp.dest('tmp/js'));
});

gulp.task('copy:own-script', function() {
	return gulp.src(['js/examples/own-script.js'])
				.pipe(gulp.dest('tmp/me/js'));
});

// Copy JSON files to tmp
gulp.task('copy:json', function() {
	return gulp.src(['responses/*.json'])
				.pipe(gulp.dest('tmp/responses'));
});

// Copy favicon to tmp
gulp.task('copy:icon', function() {
	return gulp.src('favicons/*')
		.pipe(gulp.dest('tmp'));
});

// Compile HTML
gulp.task('compile:html', function() {
	// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
	const locals = {
		production: false,
		jquery_script_location: 'node_modules/jquery/dist/jquery.js',
		jquery_mousewheel_script_location: 'node_modules/jquery.terminal/js/jquery.mousewheel-min.js',
		jquery_terminal_script_location: 'node_modules/jquery.terminal/js/jquery.terminal.js',
		init_script_location: 'js/examples/example-script.js',
		cmd_resume_script_location: 'tmp/js/cmd-resume.js',
		jquery_terminal_stylesheet_location: 'node_modules/jquery.terminal/css/jquery.terminal.css',
		sitename: 'Command Line Résumé',
		favicon_directory: './favicons'
	};
	// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	return gulp.src('index.pug')
		.pipe(pug({
			locals: locals
		}))
		.pipe(gulp.dest('./'));
});

let getLibraryVersion = libraryName => {
	let version = package['devDependencies'][libraryName];
	return version.replace('=', '');
};

gulp.task('compile:html:example', function() { 
	// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
	const locals = {
		production: true,
		jquery_script_location: `//cdnjs.cloudflare.com/ajax/libs/jquery/${getLibraryVersion('jquery')}/jquery.min.js`,
		jquery_mousewheel_script_location: `//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/${getLibraryVersion('jquery-mousewheel')}/jquery.mousewheel.min.js`,
		jquery_terminal_script_location: `//cdnjs.cloudflare.com/ajax/libs/jquery.terminal/${getLibraryVersion('jquery.terminal')}/js/jquery.terminal.min.js`,
		init_script_location: './js/example-script.js',
		cmd_resume_script_location: './js/cmd-resume.js',
		jquery_terminal_stylesheet_location: `//cdnjs.cloudflare.com/ajax/libs/jquery.terminal/${getLibraryVersion('jquery.terminal')}/css/jquery.terminal.min.css`,
		sitename: 'Command Line Résumé',
		favicon_directory: '.'
	};
	// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	return gulp.src('index.pug')
		.pipe(pug({
			locals: locals
		}))
		.pipe(gulp.dest('./tmp'));
});

gulp.task('compile:html:own-example', function() {
	// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
	const locals = {
		production: true,
		jquery_script_location: `//cdnjs.cloudflare.com/ajax/libs/jquery/${getLibraryVersion('jquery')}/jquery.min.js`,
		jquery_mousewheel_script_location: `//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/${getLibraryVersion('jquery-mousewheel')}/jquery.mousewheel.min.js`,
		jquery_terminal_script_location: `//cdnjs.cloudflare.com/ajax/libs/jquery.terminal/${getLibraryVersion('jquery.terminal')}/js/jquery.terminal.min.js`,
		init_script_location: './js/own-script.js',
		cmd_resume_script_location: '../js/cmd-resume.js',
		jquery_terminal_stylesheet_location: `//cdnjs.cloudflare.com/ajax/libs/jquery.terminal/${getLibraryVersion('jquery.terminal')}/css/jquery.terminal.min.css`,
		sitename: 'Command Line Résumé',
		favicon_directory: '..'
	};
	// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	return gulp.src('index.pug')
		.pipe(pug({
			pretty: true,
			locals: locals
		}))
		.pipe(gulp.dest('./tmp/me'));
});

// Compile JavaScript
gulp.task('compile:release:minified', function() {
	return compiledCode('./dist', true, true);
});

gulp.task('compile:release', function() {
	return compiledCode('./dist', false, true);
});

gulp.task('compile:development', function() {
	return compiledCode('./tmp/js', false, false);
});

let runTests = (browsers, done) => {
	new Server({
		configFile: `${__dirname}/karma.conf.js`,
		singleRun: false,
		browsers: browsers
	}, done).start();
};

// Testing
gulp.task('test:karma:build', function(done) {
	return runTests(['PhantomJS', 'CustomChromeHeadless', 'FirefoxHeadless'],
		done);
});

gulp.task('test:karma:linux', function(done) {
	return runTests(['Chrome', 'Firefox'], done);
});

gulp.task('test:karma:macos', function(done) {
	return runTests(['Chrome', 'Firefox', 'Safari'], done);
});

gulp.task('test:karma:windows', function(done) {
	return runTests(['Chrome', 'Firefox', 'IE'], done);
});

gulp.task('test:e2e', function() {
	// return gulp.src('wdio.conf.js').pipe(webdriver());
});

// Deployment
gulp.task('build-gh-pages', ['compile:gh-pages', 'compile:html:example',
	'compile:html:own-example', 'copy:json', 'copy:icon', 'copy:example-script',
	'copy:own-script']);

gulp.task('deploy', ['build-gh-pages', 'gh-pages']);

gulp.task('compile:gh-pages', function() {
	return compiledCode('tmp/js', false, false);
});
