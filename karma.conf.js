// Karma configuration
module.exports = function(config) {
	config.set({
		basePath: '',
		// Frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine-ajax', 'jasmine', 'jquery-3.1.1'],
		files: [
			'node_modules/jquery.terminal/js/jquery.terminal.js',
			'js/helper-functions.js',
			'js/cmd-resume.js',
			'spec/helping-functions-spec.js',
			// 'spec/cmd-resume-spec.js'
		],
		exclude: [],
		preprocessors: {
			'js/*.js': ['coverage']
		},
		reporters: ['progress', 'coverage'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		customLaunchers: {
			CustomChromeHeadless: {
				base: 'ChromeHeadless',
				flags: ['--disable-gpu', '--disable-translate',
				'--disable-extensions','--remote-debugging-port=9223']
			},
			FirefoxHeadless: {
		        base: 'Firefox',
		        flags: [ '-headless' ],
		    }
		},
		singleRun: false,
		concurrency: Infinity,
		coverageReporter: {
			reporters: [
				{type: 'lcovonly', subdir: '.'},
				{type: 'json', subdir: '.'}
			]
		}
	});
};
