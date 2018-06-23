// Karma configuration
module.exports = function(config) {
	config.set({
		basePath: '',
		// Frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine-ajax', 'jasmine', 'jquery-3.1.1', 'fixture'],
		files: [
			'node_modules/jquery.terminal/js/jquery.terminal.js',
			'spec/support/helpers.js',
			'js/helpers/*.js',
			'js/cmd-resume.js',
			'spec/*.spec.js',
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
		customLaunchers: {
			CustomChromeHeadless: {
				base: 'ChromeHeadless',
				flags: ['--disable-gpu', '--disable-translate',
				'--disable-extensions','--remote-debugging-port=9223']
			},
			FirefoxHeadless: {
				base: 'Firefox',
				flags: ['-headless'],
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
		}
	});
};
