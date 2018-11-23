// Karma configuration
module.exports = function(config) {
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
			startTunnel: true
		},
		customLaunchers: {
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
			'bs_firefox_mac': {
				'base': 'BrowserStack',
				'browser': 'firefox',
				'browser_version': '21.0',
				'os': 'OS X',
				'os_version': 'Mountain Lion'
			},
			'bs_iphone5': {
				'base': 'BrowserStack',
				'device': 'iPhone 5',
				'os': 'ios',
				'os_version': '6.0'
			},
			'bs_win7_ie11': {
				'base': 'BrowserStack',
				'os': 'Windows',
				'os_version': '7',
				'browser': 'IE',
				'browserName': 'IE',
				'browser_version': '11.0',
				'selenium_version': '3.5.2'
			},
			'bs_win10_edge11': {
				'base': 'BrowserStack',
				'os': 'Windows',
				'os_version': '10',
				'browser': 'Edge',
				'browserName': 'Edge',
				'browser_version': '17.0',
				'selenium_version': '3.5.2'
			},
			'bs_win10_chrome70': {
				'base': 'BrowserStack',
				'os': 'Windows',
				'os_version': '10',
				'browser': 'Chrome',
				'browserName': 'Chrome',
				'browser_version': '70.0',
				'selenium_version': '3.5.2'
			}
		},
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
