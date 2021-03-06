/* File: gulpfile.js */

// Helpers
var helper = require('./gulpfile_helpers');

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
	pugLinter = require('gulp-pug-linter'),
	package = require('./package.json'),
	pugLintStylish = require('puglint-stylish');

var TOOLS = ['*.conf.js', 'gulpfile.js', 'gulpfile_helpers.js', 'scripts/*.js', 'js/examples/*.js'];
var UNIT_TESTS = ['spec/**/*.spec.js', 'spec/support/*.js'];
var UI_TESTS = ['spec-e2e/**/*.spec.js', 'spec-e2e/support/*.js'];
var SOURCE = ['js/helpers/constants.js', 'js/helpers/misc.js',
	'js/helpers/formatters.js', 'js/helpers/commandHandlers.js',
	'js/helpers/github.js',
	'js/cmd-resume.js'
];
var JS_SOURCE = ['js/cmd-resume.js', 'js/helpers/*.js'];
var OUTPUT = ['tmp/js/cmd-resume.js'];
var JSON = ['browserstack/*.json', 'fixtures/*.json', 'responses/*.json',
	'fixtures/*.json', 'spec/.jscsrc*', '.jshintrc-*', '..jscsrc-*',
	'spec/.jshintrc', 'spec-e2e/.jscsrc', 'spec-e2e/.jshintrc',
	'package.json', 'package-lock.json', 'lint-staged.config.json'
];
var MARKDOWN = ['docs/**/*.mdpp', 'LICENSE.md'];
var PUG = ['templates/**/*.pug'];

var files = helper.getArgumentList(process.argv);
files = files.length ? files : false;

var OPERATING_SYSTEM = helper.getCurrentOperatingSystem();

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
		stream.pipe(inject.prepend(helper.getVersionString(package)));
	}

	return stream.pipe(gulp.dest(destination));
}

function getE2EBrowsers(browserList, headless, server) {
	var capabilities = [];

	headless = headless ? headless : false;
	server = server ? server : false;

	browserList.forEach(function(browser) {
		var capability = {};

		if (headless && browser === 'firefox') {
			capability['moz:firefoxOptions'] = {
				args: ['-headless']
			};

			if (server) {
				capability['moz:firefoxOptions'].binary = '/usr/bin/firefox';
			}
		} else if (headless && browser === 'chrome') {
			capability.version = 71;
			capability.chromeOptions = {
				args: ['--headless', '--disable-gpu']
			};

			if (server) {
				capability.chromeOptions.binary = '/usr/bin/google-chrome';
			}
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

function jsHintDevelopment(done) {
	gulp.src(files ? files : OUTPUT)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
	done();
}

function jshintTools(done) {
	gulp.src(files ? files : TOOLS)
		.pipe(jshint('./.jshintrc-tools'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
	done();
}

function jshintUnitTests(done) {
	gulp.src(files ? files : UNIT_TESTS)
		.pipe(jshint('./spec/.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
	done();
}

function jshintUITests(done) {
	gulp.src(files ? files : UI_TESTS)
		.pipe(jshint('./spec-e2e/.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
	done();
}

var jshintTests = gulp.parallel(jshintUnitTests, jshintUITests);

function jscsDevelopment(done) {
	gulp.src(files ? files : SOURCE)
		.pipe(jscs())
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));
	done();
}

function jscsTools(done) {
	gulp.src(files ? files : TOOLS)
		.pipe(jscs({configPath: './.jscsrc-tools'}))
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));
	done();
}

function jscsUnitTests(done) {
	gulp.src(files ? files : UNIT_TESTS)
		.pipe(jscs({configPath: './spec/.jscsrc'}))
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));
	done();
}

function jscsUITests(done) {
	gulp.src(files ? files : UI_TESTS)
		.pipe(jscs({configPath: './spec-e2e/.jscsrc'}))
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));
	done();
}

var jscsTests = gulp.parallel(jscsUnitTests, jscsUITests);

function jsonLint(done) {
	gulp.src(files ? files : JSON)
		.pipe(jsonlint())
		.pipe(jsonlint.reporter())
		.pipe(jsonlint.failOnError());
	done();
}

function mdlint(done) {
	gulp.src(files ? files : MARKDOWN)
		.pipe(remark({frail: true}));
	done();
}

function pugLint(done) {
	gulp.src(files ? files : PUG)
		.pipe(pugLinter({reporter: pugLintStylish, failAfterError: true}));
	done();
}

function copyExampleScript(done) {
	gulp.src(['js/examples/example-script.js'])
		.pipe(gulp.dest('tmp/js'));
	done();
}

function copyOwnScript(done) {
	gulp.src(['js/examples/own-script.js'])
		.pipe(gulp.dest('tmp/me/js'));
	done();
}

// Copy JSON files to tmp
function copyJSONBuild(done) {
	gulp.src(['responses/*.json'])
		.pipe(gulp.dest('tmp/responses'));
	done();
}

function copyJSONTest(done) {
	gulp.src(['responses/*.json'])
		.pipe(gulp.dest('test_tmp/responses'));
	done();
}

function copyJSTest(done) {
	gulp.src(['dist/cmd-resume.js'])
		.pipe(gulp.dest('test_tmp/js'));
	done();
}

// Copy favicon to tmp
function copyIconsTest(done) {
	gulp.src('favicons/*')
		.pipe(gulp.dest('test_tmp'));
	done();
}

function copyIconsBuild(done) {
	gulp.src('favicons/*')
		.pipe(gulp.dest('tmp'));
	done();
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

function compileHTMLExample(done) {
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
	gulp.src('templates/index.pug')
		.pipe(pug({
			locals: locals
		}))
		.pipe(gulp.dest('./tmp'));
	done();
}

function compileHTMLOwnExample(done) {
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
	gulp.src('templates/index.pug')
		.pipe(pug({
			pretty: true,
			locals: locals
		}))
		.pipe(gulp.dest('./tmp/me'));
	done();
}

function compileHTMLTest(done) {
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
	gulp.src('templates/index.pug')
		.pipe(pug({
			locals: locals
		}))
		.pipe(gulp.dest('./test_tmp'));
	done();
}

// Compile JavaScript
function compileReleaseMinified(done) {
	compiledCode('./dist', true, true).on('finish', function() {
		return done();
	});
}

function compileRelease(done) {
	compiledCode('./dist', false, true).on('finish', function() {
		return done();
	});
}

function compileDevelopment(done) {
	compiledCode('./tmp/js', false, false).on('finish', function() {
		return done();
	});
}

const build = gulp.series(compileHTML, compileDevelopment, copyJSONBuild, copyIconsBuild);

const release = gulp.series(compileReleaseMinified, compileRelease);

const sourceCheckDevelopment = gulp.series(compileDevelopment, jscsDevelopment, jsHintDevelopment);

const sourceCheckTools = gulp.series(jshintTools, jscsTools);

const sourceCheckTests = gulp.series(jshintTests, jscsTests);

const sourceCheckUnitTests = gulp.series(jshintUnitTests, jscsUnitTests);
const sourceCheckUITests = gulp.series(jshintUITests, jscsUITests);

const sourceCheck = gulp.series(sourceCheckDevelopment, sourceCheckTools, sourceCheckTests, pugLint);

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
		capabilities: getE2EBrowsers(['chrome', 'firefox'], true, true)
	}));

	done();
}

function testE2EBrowserstackEssential(done) {
	gulp.src('wdio.browserstack.essential.conf.js').pipe(webdriver({
		jasmineNodeOpts: {
			defaultTimeoutInterval: 50000
		}
	}));
	done();
}

function testE2EBrowserstackAll(done) {
	gulp.src('wdio.browserstack.all.conf.js').pipe(webdriver({
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

function testE2EHeadless(done) {
	gulp.src('wdio.conf.js').pipe(webdriver({
		jasmineNodeOpts: {
			defaultTimeoutInterval: 50000
		},
		logLevel: 'error',
		capabilities: getE2EBrowsers(['chrome', 'firefox'], true)
	}));

	done();
}

function testE2EWithVisualRegression(done) {
	gulp.src('wdio.visualregression.conf.js').pipe(webdriver({
		jasmineNodeOpts: {
			defaultTimeoutInterval: 50000
		},
		logLevel: 'verbose',
		capabilities: getE2EBrowsers(['chrome', 'firefox'], true)
	}));

	done();
}

const testE2EPre = gulp.series(copyIconsTest, compileHTMLTest, copyJSONTest, copyJSTest);

const testMacOS = gulp.series(testKarmaMacOS, testE2EPre, testE2EMacOS);

const testWindows = gulp.series(testKarmaWindows, testE2EPre, testE2EWindows);

const testLinux = gulp.series(testKarmaLinux, testE2EPre, testE2ELinux);

const resetReferenceImages = gulp.series(testE2EPre, testE2EWithVisualRegression);

const testWithVisualRegression = gulp.series(testKarmaBuild, testE2EPre, testE2EWithVisualRegression);

const testBuild = gulp.series(testKarmaBuild, testE2EPre, testE2EBuild);

const testBSUIEssential = gulp.series(testE2EPre, testE2EBrowserstackEssential);
const testBSUIAll = gulp.series(testE2EPre, testE2EBrowserstackAll);

function compileGHPages() {
	return compiledCode('tmp/js', false, false);
}

var localTestUnitList = {
	'macos': testKarmaMacOS,
	'windows': testKarmaWindows,
	'linux': testKarmaLinux
};

var localTestUIList = {
	'macos': testE2EMacOS,
	'windows': testE2EWindows,
	'linux': testE2ELinux
};

const buildGHPages = gulp.series(compileGHPages, compileHTMLExample, compileHTMLOwnExample, copyJSONBuild, copyIconsBuild, copyExampleScript, copyOwnScript);

function testLocalUnit(done) {
	localTestUnitList[OPERATING_SYSTEM]();
	done();
}

function testLocalUITests(done) {
	localTestUIList[OPERATING_SYSTEM]();
	done();
}

const testLocalUI = gulp.series(testE2EPre, testLocalUITests);

const testLocal = gulp.series(testLocalUnit, testLocalUI);

function watch() {
	// Example build changes
	gulp.watch(JS_SOURCE, gulp.series(compileDevelopment, jsHintDevelopment, jscsDevelopment, testKarmaBuild, testE2EHeadless));
	gulp.watch(['favicons/*'], copyIconsTest);
	gulp.watch(['responses/*'], copyJSONBuild);

	gulp.watch(['templates/**/*.pug'], gulp.series(pugLint, compileHTML)); // Lint Pug here
	gulp.watch(MARKDOWN, gulp.series(mdlint)); // Run MD Compile here too

	// Pure linting
	gulp.watch(JSON, jsonLint);
	gulp.watch(TOOLS, sourceCheckTools);

	// Unit Testing
	gulp.watch(UNIT_TESTS, gulp.series(jscsUnitTests, jshintUnitTests, testKarmaBuild));

	// UI Testing
	gulp.watch(UI_TESTS, gulp.series(jscsUITests, jshintUITests, testE2EHeadless));
}

// Task for development
const develop = gulp.series(build, gulp.parallel(watch, serve));

module.exports = {
	'default': develop,

	// Build tasks
	'build:gh_pages': buildGHPages,
	'build:release': release,
	'build:e2e_prepare': testE2EPre,

	// Lint tasks
	'lint:all': sourceCheck,
	'lint:pug': pugLint,
	'lint:json': jsonLint,
	'lint:markdown': mdlint,
	'lint:javascript:source': sourceCheckDevelopment,
	'lint:javascript:tests': sourceCheckTests,
	'lint:javascript:tests:unit': sourceCheckUnitTests,
	'lint:javascript:tests:e2e': sourceCheckUITests,
	'lint:javascript:tools': sourceCheckTools,

	// Unit tests
	'test:unit:build': testKarmaBuild,
	'test:unit:local': testLocalUnit,
	'test:unit:bs_all': testKarmaBrowserstack,
	'test:unit:bs_essential': testKarmaBrowserstackEssential,

	// UI tests
	'test:e2e:build': testE2EBuild,
	'test:e2e:local': testLocalUI,
	'test:e2e:bs_essential': testBSUIEssential,
	'test:e2e:bs_all': testBSUIAll,
	'test:e2e:visual_reference': resetReferenceImages,

	// Combined tests
	'test:all:build': testBuild,
	'test:all:build_visual_regression': testWithVisualRegression,
	'test:all:local': testLocal,
	'test:all:linux': testLinux,
	'test:all:mac_os': testMacOS,
	'test:all:windows': testWindows
};
