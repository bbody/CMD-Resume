var browserstack = require('browserstack-local');
let wdioConf = require("./wdio.conf.js").config;
var merge = require('deepmerge');

var capabilities = require('./browserstack/bs-customLaunchers.essential.json').browsers;

// Set a build name based off build number
var jobId = process && process.env && process.env.TRAVIS_BUILD_NUMBER ? process.env.TRAVIS_BUILD_NUMBER : "local_development";
var buildName = `UI ${jobId}`;
for (var i = 0; i < capabilities.length; i++) {
	capabilities[i].build = buildName;
	console.log(capabilities[i].specs);
	if (!capabilities[i].specs) {
		capabilities[i].specs = ["spec-e2e/*.spec.js"];
	}
}

wdioConf.services.push('browserstack');
wdioConf.specs = [];

exports.config = merge(wdioConf, {
	user: process.env.BROWSER_STACK_USERNAME,
	key: process.env.BROWSER_STACK_ACCESS_KEY,
	browserstackLocal: true,
	capabilities: capabilities,
	maxInstances: 5
});
