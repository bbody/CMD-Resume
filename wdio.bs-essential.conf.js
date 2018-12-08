var browserstack = require('browserstack-local');
let wdioConf = require("./wdio.conf.js").config;
var merge = require('deepmerge');

var capabilities = require('./browserstack/bs-customLaunchers.essential.json').browsers;

var jobId = process && process.env && process.env.TRAVIS_JOB_ID ? process.env.TRAVIS_JOB_ID : "local development";
var buildName = `UI Build: ${jobId}`
for (var i = 0; i < capabilities.length; i++) {
	capabilities["browserstack.local"] = true;
	capabilities.build = buildName;
	capabilities.project = buildName;
	capabilities['browserstack.build'] = buildName;
	capabilities['browserstack.project'] = buildName;
}

exports.config = merge(wdioConf, {
	user: process.env.BROWSER_STACK_USERNAME,
	key: process.env.BROWSER_STACK_ACCESS_KEY,
	browserstackLocal: true,
	capabilities: capabilities,
	"browserstack.local": true,
	'build': `UI Build: ${process.env.TRAVIS_JOB_ID}`,
	onPrepare: function (config, capabilities) {
		console.log("Connecting local");
		return new Promise(function(resolve, reject) {
		            exports.bs_local = new browserstack.Local();
		            exports.bs_local.start({ 'key': exports.config.key }, function(error) {
		                if (error) return reject(error);
		                console.log('Connected. Now testing...');

		                resolve();
		            });
		});
	},
	onComplete: function (capabilties, specs) {
		exports.bs_local.stop(function() {
			console.log("Finished testing.")
		});
	}
});
