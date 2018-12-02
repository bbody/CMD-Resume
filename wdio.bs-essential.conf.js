var browserstack = require('browserstack-local');
let wdioConf = require("./wdio.conf.js");
var merge = require('deepmerge');

var capabilities = require('./browserstack/bs-customLaunchers.essential.json').browsers;

for (var i = 0; i < capabilities.length; i++) {
	capabilities["browserstack.local"] = true;
	capabilities.build = `UI Build: ${process.env.TRAVIS_JOB_ID}`;
}

exports.config = merge(wdioConf, {
	user: process.env.BROWSERSTACK_USERNAME,
	key: process.env.BROWSERSTACK_KEY,
	capabilities: capabilities,
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
		exports.bs_local.stop(function() {});
	}
});

exports.config = {...config.config, ...exports.config};