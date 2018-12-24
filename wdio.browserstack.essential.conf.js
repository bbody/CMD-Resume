let wdioConf = require("./wdio.browserstack.base.conf.js").config;
var merge = require('deepmerge');

console.log(wdioConf.getBrowserList('./browserstack/bs-customLaunchers.essential.json'));
exports.config = merge(wdioConf, {
	capabilities: wdioConf.getBrowserList('./browserstack/bs-customLaunchers.essential.json')
});