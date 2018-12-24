let wdioConf = require("./wdio.browserstack.base.conf.js").config;
var merge = require('deepmerge');

var capabilities = require('./browserstack/bs-customLaunchers.all.json').browsers;

// Set a build name based off build number
var jobId = process && process.env && process.env.TRAVIS_BUILD_NUMBER ? process.env.TRAVIS_BUILD_NUMBER : "local_development";
var buildName = `UI ${jobId}`;
for (var i = 0; i < capabilities.length; i++) {
	capabilities[i].build = buildName;
	if (!capabilities[i].specs) {
		capabilities[i].specs = ["spec-e2e/*.spec.js"];
	}
}

exports.config = merge(wdioConf, {
	capabilities: capabilities
});