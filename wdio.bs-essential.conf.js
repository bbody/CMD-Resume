var browserstack = require('browserstack-local');
let config = require("./wdio.conf.js");

exports.config = {
	user: process.env.BROWSERSTACK_USERNAME,
	key: process.env.BROWSERSTACK_KEY,
	capabilities: require('./browserstack/bs-customLaunchers.essential.json').browsers,
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
};

exports.config = {...config.config, ...exports.config};
