// Karma configuration
module.exports = function(config) {
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

	Object.assign(bsBrowserProfiles, require('./browserstack/bs-customLaunchers.json'));
	// console.log(bsBrowserProfiles);
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
		reporters: ['progress', 'coverage', 'BrowserStack'],
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
