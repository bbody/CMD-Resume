let wdioConf = require("./wdio.browserstack.base.conf.js").config;
var merge = require('deepmerge');

exports.config = merge(wdioConf, {
	capabilities: wdioConf.getBrowserList('./browserstack/bs-customLaunchers.all.json')
});