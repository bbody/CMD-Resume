// Karma configuration
module.exports = function(config) {
	const LATEST = 'LATEST';

	var getBrowserStackBrowserList = function(allBrowsers, os, osVersion, browser, browserVersions) {
		var configs = {};

		for (var version of browserVersions) {
			var versionKey = `bs__${os}_${osVersion}__${browser}_${version}`;
			var config = {
				'base': 'BrowserStack',
				'os': os,
				'os_version': version,
				'browser': browser
			};

			if (version === LATEST) {
				// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
				config.browser_version = version;
				// jscs:enable
			}

			configs[versionKey] = config;
		}
		return Object.assign(allBrowsers, configs);
	};

	var bsBrowserProfiles = {
		'CustomChromeHeadless': {
			'base': 'ChromeHeadless',
			'displayName': 'Headless Chrome',
			'flags': ['--disable-gpu', '--disable-translate',
			'--disable-extensions','--remote-debugging-port=9223']
		},
		'FirefoxHeadless': {
			'base': 'Firefox',
			'displayName': 'Headless Firefox',
			'flags': ['-headless'],
		},
	};

	// Windows 10
	bsBrowserProfiles = getBrowserStackBrowserList(bsBrowserProfiles, 'Windows', '10', 'Chrome', [LATEST, '70', '60', '50', '40', '37']);
	bsBrowserProfiles = getBrowserStackBrowserList(bsBrowserProfiles, 'Windows', '10', 'Firefox', [LATEST, '60', '50', '40', '32']);
	bsBrowserProfiles = getBrowserStackBrowserList(bsBrowserProfiles, 'Windows', '10', 'Edge', [LATEST, '17', '16', '15']);
	bsBrowserProfiles = getBrowserStackBrowserList(bsBrowserProfiles, 'Windows', '10', 'IE', [LATEST]);

	// Windows 8.1
	bsBrowserProfiles = getBrowserStackBrowserList(bsBrowserProfiles, 'Windows', '8.1', 'Chrome', [LATEST, '70', '60', '50', '40', '37']);
	bsBrowserProfiles = getBrowserStackBrowserList(bsBrowserProfiles, 'Windows', '8.1', 'Firefox', [LATEST, '60', '50', '40', '32']);
	bsBrowserProfiles = getBrowserStackBrowserList(bsBrowserProfiles, 'Windows', '8.1', 'IE', [LATEST]);
	bsBrowserProfiles = getBrowserStackBrowserList(bsBrowserProfiles, 'Windows', '8.1', 'Opera', [LATEST, '12.16', '12.15']);

	// Windows 8
	// bsBrowserProfiles = getBrowserStackBrowserList(bsBrowserProfiles, 'Windows', '8.1', 'Chrome', [LATEST, '70', '60', '50', '40', '37']);
	// bsBrowserProfiles = getBrowserStackBrowserList(bsBrowserProfiles, 'Windows', '8.1', 'Firefox', [LATEST, '60', '50', '40', '32']);
	// bsBrowserProfiles = getBrowserStackBrowserList(bsBrowserProfiles, 'Windows', '8.1', 'IE', [LATEST]);
	// bsBrowserProfiles = getBrowserStackBrowserList(bsBrowserProfiles, 'Windows', '8.1', 'Opera', [LATEST, '12.16', '12.15']);

	config.set({
		basePath: '',
		// Frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: [
			'jasmine-ajax',
			'jasmine',
			'jquery-3.1.1',
			'fixture'
		],
		files: [
			'node_modules/jquery.terminal/js/jquery.terminal.js',
			'spec/support/helpers.js',
			'js/helpers/*.js',
			'js/cmd-resume.js',
			'spec/**/*.spec.js',
			'fixtures/**/*.json'
		],
		exclude: [],
		preprocessors: {
			'js/**/*.js': ['coverage'],
			'fixtures/**/*.json': ['json_fixtures']

		},
		reporters: ['progress', 'coverage'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browserStack: {
			username: process.env.BROWSERSTACK_USERNAME,
			accessKey: process.env.BROWSERSTACK_KEY,
			startTunnel: true,
			video: false
		},
		customLaunchers: bsBrowserProfiles,
		singleRun: true,
		concurrency: Infinity,
		coverageReporter: {
			reporters: [
				{type: 'lcovonly', subdir: '.'},
				{type: 'json', subdir: '.'},
				{type: 'html', subdir: '.'}
			]
		},
		jsonFixturesPreprocessor: {
			stripPrefix: 'fixtures/',
			variableName: '__json__'
		},
		plugins: [
			'karma-jasmine',
			'karma-jasmine-ajax',
			'karma-fixture',
			'karma-json-fixtures-preprocessor',
			'karma-jquery',
			'karma-coverage',
			'karma-browserstack-launcher',
			'karma-firefox-launcher',
			'karma-chrome-launcher',
			'karma-browserify',
			'karma-edge-launcher',
			'karma-ie-launcher',
			'karma-requirejs',
			'karma-safari-launcher'
		]
	});
};
