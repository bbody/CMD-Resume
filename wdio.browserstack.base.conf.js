let wdioConf = require('./wdio.conf.js').config;
var merge = require('deepmerge');

wdioConf.services.push('browserstack');
wdioConf.specs = [];

function hasTravisBuildNumber() {
	return process && process.env && process.env.TRAVIS_BUILD_NUMBER &&
		process.env.TRAVIS_BUILD_NUMBER.length > 0;
}

exports.config = merge(wdioConf, {
	user: process.env.BROWSER_STACK_USERNAME,
	key: process.env.BROWSER_STACK_ACCESS_KEY,
	browserstackLocal: true,
	maxInstances: 5,
	bail: 1,
	getBrowserList: function(fileName) {
		var capabilities = require(fileName).browsers;

		// Set a build name based off build number
		var jobId = hasTravisBuildNumber ?
			process.env.TRAVIS_BUILD_NUMBER : 'local_development';
		var buildName = `UI ${jobId}`;
		for (var i = 0; i < capabilities.length; i++) {
			capabilities[i].build = buildName;
			if (!capabilities[i].specs) {
				capabilities[i].specs = ['spec-e2e/*.spec.js'];
			}
		}

		return capabilities;
	}
});
