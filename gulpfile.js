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
	pug = require('gulp-pug'),
	jsonlint = require('gulp-json-lint'),
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

gulp.task('test:local', [`test:${OPERATING_SYSTEM}`]);

// Default Gulp task is develop
gulp.task('default', ['develop']);

// Task for development
gulp.task('develop', ['watch', 'build', 'serve']);

// Task for test
gulp.task('test', ['watch', 'build', 'test:karma:build', 'coverage']);

// Build the project
gulp.task('build', ['compile:html', // 'test:karma:build',
	'compile:development', 'copy:json:build', 'copy:icons:build'
]);

gulp.task('release', ['compile:release:minified', 'compile:release']);

// Watch important files
gulp.task('watch', function() {
	gulp.watch(['js/**/*.js', 'index.html', 'spec/*.js', 'karma.conf.js'], ['build']);
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

gulp.task('source-check', ['source-check:development', 'source-check:tools', 'source-check:tests']);

gulp.task('source-check:development', ['build', 'jshint:development',
	'jscs:development'
]);

gulp.task('source-check:tools', ['jshint:tools', 'jscs:tools']);

gulp.task('source-check:tests', ['jshint:tests', 'jscs:tests', 'jsonlint']);

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
		.pipe(jshint('./spec/.jshintrc'))
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
		.pipe(jscs.reporter('fail'));
});

gulp.task('jscs:tests', function() {
	return gulp.src(TESTS)
		.pipe(jscs({configPath: './spec/.jscsrc'}))
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'));
});

gulp.task('jsonlint', function() {
	gulp.src(['**/*.json', '!node_modules/**'])
		.pipe(jsonlint())
		.pipe(jsonlint.report('verbose'));
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
gulp.task('copy:json:build', function() {
	return gulp.src(['responses/*.json'])
		.pipe(gulp.dest('tmp/responses'));
});

gulp.task('copy:json:test', function() {
	return gulp.src(['responses/*.json'])
		.pipe(gulp.dest('test_tmp/responses'));
});

gulp.task('copy:js:test', function() {
	return gulp.src(['dist/cmd-resume.js'])
		.pipe(gulp.dest('test_tmp/js'));
});

// Copy favicon to tmp
gulp.task('copy:icons:test', function() {
	return gulp.src('favicons/*')
		.pipe(gulp.dest('test_tmp'));
});

gulp.task('copy:icons:build', function() {
	return gulp.src('favicons/*')
		.pipe(gulp.dest('tmp'));
});

// Compile HTML
gulp.task('compile:html', function() {
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
});

let getLibraryVersion = libraryName => {
	let version = package.devDependencies[libraryName];
	return version.replace('=', '');
};

gulp.task('compile:html:example', function() {
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
});

gulp.task('compile:html:own-example', function() {
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
});

gulp.task('compile:html:test', function() {
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
		singleRun: true,
		browsers: browsers
	}, done).start();
};

// Testing
gulp.task('test:karma:build', function(done) {
	return runTests(['CustomChromeHeadless', 'FirefoxHeadless'],
		done);
});

gulp.task('test:karma:browserstack', function(done) {
	var browsers = require('./browserstack/bs-browerList.json').browsers;
	return runTests(browsers, done);
});

gulp.task('test:karma:browserstack:essential', function(done) {
	var browsers = require('./browserstack/bs-browerList-essential.json').browsers;
	return runTests(browsers, done);
});

gulp.task('test:karma:linux', function(done) {
	return runTests(['Chrome', 'Firefox'], done);
});

gulp.task('test:karma:macos', function(done) {
	return runTests(['Chrome', 'Firefox', 'Safari'], done);
});

gulp.task('test:karma:windows', function(done) {
	return runTests(['Chrome', 'Firefox', 'IE', 'Edge'], done);
});

gulp.task('test:e2e:build', function() {
	return gulp.src('wdio.conf.js').pipe(webdriver({
		jasmineNodeOpts: {
			defaultTimeoutInterval: 50000
		},
		capabilities: getE2EBrowsers(['chrome', 'firefox'], true)
	}));
});

gulp.task('test:e2e:windows', function() {
	return gulp.src('wdio.conf.js').pipe(webdriver({
		capabilities: getE2EBrowsers(['chrome', 'firefox', 'internet explorer', 'MicrosoftEdge'])
	}));
});

gulp.task('test:e2e:macos', function() {
	return gulp.src('wdio.conf.js').pipe(webdriver({
		capabilities: getE2EBrowsers(['chrome', 'firefox', 'safari'])
	}));
});

gulp.task('test:e2e:linux', function() {
	return gulp.src('wdio.conf.js').pipe(webdriver({
		capabilities: getE2EBrowsers(['chrome', 'firefox'])
	}));
});

gulp.task('test:e2e', function() {
	return gulp.src('wdio.conf.js').pipe(webdriver());
});

gulp.task('test:e2e:pre', ['copy:icons:test', 'compile:html:test', 'copy:json:test', 'copy:js:test']);

gulp.task('test:macos', ['test:karma:macos', 'test:e2e:pre', 'test:e2e:macos']);
gulp.task('test:windows', ['test:karma:windows', 'test:e2e:pre', 'test:e2e:windows']);
gulp.task('test:linux', ['test:karma:linux', 'test:e2e:pre', 'test:e2e:linux']);

// Deployment
gulp.task('build-gh-pages', ['compile:gh-pages', 'compile:html:example',
	'compile:html:own-example', 'copy:json:build', 'copy:icons:build', 'copy:example-script',
	'copy:own-script'
]);

gulp.task('deploy', ['build-gh-pages', 'gh-pages']);

gulp.task('compile:gh-pages', function() {
	return compiledCode('tmp/js', false, false);
});
