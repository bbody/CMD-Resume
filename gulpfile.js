/* File: gulpfile.js */

// Dependencies
var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	inject = require('gulp-inject-string'),
	webserver = require('gulp-webserver'),
	concat = require('gulp-concat'),
	jscs = require('gulp-jscs'),
	Server = require('karma').Server,
	pug = require('gulp-pug'),
	jsonlint = require('gulp-jsonlint'),
	remark = require('gulp-remark'),
	webdriver = require('gulp-webdriver'),
	package = require('./package.json');

var TOOLS = ['karma.conf.js', 'gulpfile.js'];
var TESTS = ['spec/*-spec.js'];
var SOURCE = ['js/helpers/constants.js', 'js/helpers/misc.js',
	'js/helpers/formatters.js', 'js/helpers/commandHandlers.js',
	'js/helpers/github.js',
	'js/cmd-resume.js'];
var OUTPUT = ['./tmp/js/cmd-resume.js'];

function getCurrentOperatingSystem() {
	var os = require('os');
	if (os.platform().includes('mac') || os.platform().includes('darwin')) {
		return 'macos';
	} else if (os.platform().includes('win')) {
		return 'windows';
	} else {
		return 'linux';
	}
}

var OPERATING_SYSTEM = getCurrentOperatingSystem();

// Useful functions
function getVersion() {
	return package.version;
}

function getAuthorName() {
	return package.author.name;
}

function getGithubUrl() {
	return package.repository.url;
}

function getVersionString() {
	var versionInfo = '/* v' + getVersion() +
		' of CMD Resume by ' + getAuthorName() +
		'(' + getGithubUrl() + ') */';
	return versionInfo;
}

function compiledCode(destination, minified, versioned) {
	var stream = gulp.src(SOURCE)
		.pipe(concat(minified ? 'cmd-resume.min.js' : 'cmd-resume.js'));

	stream.pipe(inject.prepend(';(function($){\n"use strict";\n\n'))
		.pipe(inject.afterEach('\n', '  '))
		.pipe(inject.append('\n}(jQuery));'));

	if (minified) {
		stream.pipe(uglify());
	}

	if (versioned) {
		stream.pipe(inject.prepend(getVersionString() + '\n'));
	}

	return stream.pipe(gulp.dest(destination));
}

function getE2EBrowsers(browserList, headless) {
	var capabilities = [];

	headless = headless ? headless : false;

	browserList.forEach(function(browser) {
		var capability = {};

		if (browser === 'chrome') {
			capability.include = ['spec-e2e/chrome/*.spec.js'];
		}

		if (browser === 'firefox') {
			capability.include = ['spec-e2e/firefox/*.spec.js'];
		}

		if (browser === 'safari') {
			capability.include = ['spec-e2e/safari/*.spec.js'];
		}

		if (browser === 'safari' || browser === 'chrome') {
			capability.include = ['spec-e2e/chrome-safari/*.spec.js'];
		}

		if (browser === 'firefox' || browser === 'chrome') {
			capability.include = ['spec-e2e/chrome-firefox/*.spec.js'];
		}

		if (headless && browser === 'firefox') {
			capability['moz:firefoxOptions'] = {
				args: ['-headless'],
				binary: '/usr/bin/firefox'
			};
		} else if (headless && browser === 'chrome') {
			capability.version = 67;
			capability.chromeOptions = {
				args: ['--headless', '--disable-gpu'],
				binary: '/usr/bin/google-chrome'
			};
		}

		capability.browserName = browser;

		capabilities.push(capability);
	});

	return capabilities;
}

function serve() {
	gulp.src('./')
		.pipe(webserver({
			livereload: true,
			open: true
		}));
}

function jsHintDevelopment() {
	return gulp.src(OUTPUT)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
}

function jshintTools() {
	return gulp.src(TOOLS)
		.pipe(jshint('./.jshintrc-tools'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
}

function jshintTests() {
	return gulp.src(TESTS)
		.pipe(jshint('./spec/.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
}

function JscsDevelopment() {
	return gulp.src(SOURCE)
		.pipe(jscs())
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));
}

function jscsTools() {
	return gulp.src(TOOLS)
		.pipe(jscs({configPath: './.jscsrc-tools'}))
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));
}

function jscsTests() {
	return gulp.src(TESTS)
		.pipe(jscs({configPath: './spec/.jscsrc'}))
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));
}

function jsonLint() {
	return gulp.src(['**/*.json', '!node_modules/**'])
		.pipe(jsonlint())
		.pipe(jsonlint.reporter())
		.pipe(jsonlint.failOnError());
}

function mdlint() {
	return gulp.src(['docs/*.mdpp', 'docs/partials/*.md'])
		.pipe(remark());
}

function copyExampleScript() {
	return gulp.src(['js/examples/example-script.js'])
		.pipe(gulp.dest('tmp/js'));
}

function copyOwnScript() {
	return gulp.src(['js/examples/own-script.js'])
		.pipe(gulp.dest('tmp/me/js'));
}

// Copy JSON files to tmp
function copyJSONBuild() {
	return gulp.src(['responses/*.json'])
		.pipe(gulp.dest('tmp/responses'));
}

function copyJSONTest() {
	return gulp.src(['responses/*.json'])
		.pipe(gulp.dest('test_tmp/responses'));
}

function copyJSTest() {
	return gulp.src(['dist/cmd-resume.js'])
		.pipe(gulp.dest('test_tmp/js'));
}

// Copy favicon to tmp
function copyIconsTest() {
	return gulp.src('favicons/*')
		.pipe(gulp.dest('test_tmp'));
}

function copyIconsBuild() {
	return gulp.src('favicons/*')
		.pipe(gulp.dest('tmp'));
}

// Compile HTML
function compileHTML() {
	// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
	const locals = {
		production: false,
		jquery_script_location: 'node_modules/jquery/dist/jquery.js',
		keyboard_polyfill: 'node_modules/js-polyfills/keyboard.js',
		jquery_terminal_script_location: 'node_modules/jquery.terminal/js/jquery.terminal.js',
		init_script_location: 'js/examples/example-script.js',
		cmd_resume_script_location: 'tmp/js/cmd-resume.js',
		jquery_terminal_stylesheet_location: 'node_modules/jquery.terminal/css/jquery.terminal.css',
		sitename: 'Command Line Résumé',
		favicon_directory: './favicons'
	};
	// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	return gulp.src('templates/index.pug')
		.pipe(pug({
			locals: locals
		}))
		.pipe(gulp.dest('./'));
}

let getLibraryVersion = libraryName => {
	let version = package.devDependencies[libraryName];
	return version.replace('=', '');
};

function compileHTMLExample() {
	// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
	const locals = {
		production: true,
		jquery_script_location: `//cdnjs.cloudflare.com/ajax/libs/jquery/${getLibraryVersion('jquery')}/jquery.min.js`,
		keyboard_polyfill: `//cdn.rawgit.com/inexorabletash/polyfill/master/keyboard.js`,
		jquery_terminal_script_location: `//cdnjs.cloudflare.com/ajax/libs/jquery.terminal/${getLibraryVersion('jquery.terminal')}/js/jquery.terminal.min.js`,
		init_script_location: './js/example-script.js',
		cmd_resume_script_location: './js/cmd-resume.js',
		jquery_terminal_stylesheet_location: `//cdnjs.cloudflare.com/ajax/libs/jquery.terminal/${getLibraryVersion('jquery.terminal')}/css/jquery.terminal.min.css`,
		sitename: 'Command Line Résumé',
		favicon_directory: '.'
	};
	// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	return gulp.src('templates/index.pug')
		.pipe(pug({
			locals: locals
		}))
		.pipe(gulp.dest('./tmp'));
}

function compileHTMLOwnExample() {
	// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
	const locals = {
		production: true,
		jquery_script_location: `//cdnjs.cloudflare.com/ajax/libs/jquery/${getLibraryVersion('jquery')}/jquery.min.js`,
		keyboard_polyfill: `//cdn.rawgit.com/inexorabletash/polyfill/master/keyboard.js`,
		jquery_terminal_script_location: `//cdnjs.cloudflare.com/ajax/libs/jquery.terminal/${getLibraryVersion('jquery.terminal')}/js/jquery.terminal.min.js`,
		init_script_location: './js/own-script.js',
		cmd_resume_script_location: '../js/cmd-resume.js',
		jquery_terminal_stylesheet_location: `//cdnjs.cloudflare.com/ajax/libs/jquery.terminal/${getLibraryVersion('jquery.terminal')}/css/jquery.terminal.min.css`,
		sitename: 'Command Line Résumé',
		favicon_directory: '..'
	};
	// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	return gulp.src('templates/index.pug')
		.pipe(pug({
			pretty: true,
			locals: locals
		}))
		.pipe(gulp.dest('./tmp/me'));
}

function compileHTMLTest() {
	// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
	const locals = {
		production: false,
		jquery_script_location: `./node_modules/jquery/dist/jquery.min.js`,
		keyboard_polyfill: `./node_modules/js-polyfills/keyboard.js`,
		jquery_terminal_script_location: `./node_modules/jquery.terminal/js/jquery.terminal.min.js`,
		init_script_location: false, // Allow script to be triggered from code
		cmd_resume_script_location: './js/cmd-resume.js',
		jquery_terminal_stylesheet_location: `./node_modules/jquery.terminal/css/jquery.terminal.min.css`,
		sitename: 'Command Line Résumé',
		favicon_directory: '.'
	};
	// jscs:enable requireCamelCaseOrUpperCaseIdentifiers
	return gulp.src('templates/index.pug')
		.pipe(pug({
			locals: locals
		}))
		.pipe(gulp.dest('./test_tmp'));
}

// Compile JavaScript
function compileReleaseMinified() {
	return compiledCode('./dist', true, true);
}

function compileRelease() {
	return compiledCode('./dist', false, true);
}

function compileDevelopment() {
	return compiledCode('./tmp/js', false, false);
}

const build = gulp.series(compileHTML, compileDevelopment, copyJSONBuild, copyIconsBuild);

function watch() {
	gulp.watch(['js/**/*.js', 'index.html', 'spec/*.js', 'karma.conf.js'], build);
}

// Task for development
const develop = gulp.series(watch, build, serve);

// Task for test
// const test = gulp.series(watch, build, testKarmaBuild); // coverage

// Build the project
// gulp.task('build', ['compile:html', // 'test:karma:build',
// 	'compile:development', 'copy:json:build', 'copy:icons:build'
// ]);

const release = gulp.series(compileReleaseMinified, compileRelease);

const sourceCheckDevelopment = gulp.series(compileDevelopment, jsHintDevelopment, JscsDevelopment);

const sourceCheckTools = gulp.series(jshintTools, jscsTools);

const sourceCheckTests = gulp.series(jshintTests, jscsTests, jsonLint, mdlint);

const sourceCheck = gulp.series(sourceCheckDevelopment, sourceCheckTools, sourceCheckTests);

let runTests = (browsers, done) => {
	new Server({
		configFile: `${__dirname}/karma.conf.js`,
		singleRun: true,
		browsers: browsers
	}, done).start();
};

// Testing
function testKarmaBuild(done) {
	return runTests(['CustomChromeHeadless', 'FirefoxHeadless'],
		done);
}

function testKarmaBrowserstack(done) {
	var browsers = require('./browserstack/bs-browerList.json').browsers;
	return runTests(browsers, done);
}

function testKarmaBrowserstackEssential(done) {
	var browsers = require('./browserstack/bs-browerList-essential.json').browsers;
	return runTests(browsers, done);
}

function testKarmaLinux(done) {
	return runTests(['Chrome', 'Firefox'], done);
}

function testKarmaMacOS(done) {
	return runTests(['Chrome', 'Firefox', 'Safari'], done);
}

function testKarmaWindows(done) {
	return runTests(['Chrome', 'Firefox', 'IE', 'Edge'], done);
}

function testE2EBuild(done) {
	gulp.src('wdio.conf.js').pipe(webdriver({
		jasmineNodeOpts: {
			defaultTimeoutInterval: 50000
		},
		capabilities: getE2EBrowsers(['chrome', 'firefox'], true)
	}));
	done();
}

function testE2EBrowserstackEssential(done) {
	gulp.src('./wdio.browserstack.conf.js').pipe(webdriver({
		jasmineNodeOpts: {
			defaultTimeoutInterval: 50000
		}
	}));
	done();
}

function testE2EWindows(done) {
	gulp.src('wdio.conf.js').pipe(webdriver({
		capabilities: getE2EBrowsers(['chrome', 'firefox', 'internet explorer', 'MicrosoftEdge'])
	}));
	done();
}

function testE2EMacOS(done) {
	gulp.src('wdio.conf.js').pipe(webdriver({
		capabilities: getE2EBrowsers(['chrome', 'firefox', 'safari'])
	}));
	done();
}

function testE2ELinux(done) {
	gulp.src('wdio.conf.js').pipe(webdriver({
		capabilities: getE2EBrowsers(['chrome', 'firefox'])
	}));
	done();
}

function testE2E(done) {
	gulp.src('wdio.conf.js').pipe(webdriver());
	done();
}

const testE2EPre = gulp.series(copyIconsTest, compileHTMLTest, copyJSONTest, copyJSTest);

const testMacOS = gulp.series(testKarmaMacOS, testE2EPre, testE2EMacOS);

const testWindows = gulp.series(testKarmaWindows, testE2EPre, testE2EWindows);

const testLinux = gulp.series(testKarmaLinux, testE2EPre, testE2ELinux);

const testBSUIEssential = gulp.series(testE2EPre, testE2EBrowserstackEssential);

// Deployment
// gulp.task('build-gh-pages', ['compile:gh-pages', 'compile:html:example',
// 	'compile:html:own-example', 'copy:json:build', 'copy:icons:build', 'copy:example-script',
// 	'copy:own-script'
// ]);

function compileGHPages() {
	return compiledCode('tmp/js', false, false);
}

var localTest = {
	'macos': testMacOS,
	'windows': testWindows,
	'linux': testLinux
};

const buildGHPages = gulp.series(compileGHPages, compileHTMLExample, compileHTMLOwnExample, copyJSONBuild, copyIconsBuild, copyExampleScript, copyOwnScript);

// gulp.task('deploy', ['build-gh-pages', 'gh-pages']);

function testLocal(done) {
	const func = localTest[OPERATING_SYSTEM];
	func();
	done();
}

module.exports = {
	'default': develop,
	buildGHPages,
	develop,
	release,
	sourceCheck,
	testBSUIEssential,
	testE2E,
	testE2EPre,
	testE2EBuild,
	testKarmaBuild,
	testKarmaBrowserstack,
	testKarmaBrowserstackEssential,
	testLocal,
	testLinux,
	testMacOS,
	testWindows
};
