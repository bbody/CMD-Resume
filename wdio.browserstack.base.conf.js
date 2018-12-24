var browserstack = require('browserstack-local');
let wdioConf = require("./wdio.conf.js").config;
var merge = require('deepmerge');

wdioConf.services.push('browserstack');
wdioConf.specs = [];

exports.config = merge(wdioConf, {
	user: process.env.BROWSER_STACK_USERNAME,
	key: process.env.BROWSER_STACK_ACCESS_KEY,
	browserstackLocal: true,
	capabilities: capabilities,
	maxInstances: 5,
	bail: 1
});
