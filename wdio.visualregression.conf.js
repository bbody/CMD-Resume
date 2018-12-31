let wdioConf = require('./wdio.conf.js').config;
var path = require('path');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotName(basePath) {
	return function(context) {
		var testName = context.test.fullName.replace(/ /gi, '_');
		// For some reason it thinks I am running Safari
		var browserName = context.browser.name === 'Safari' ? 'Chrome' : context.browser.name;

		return path.join(basePath, `${testName}__${browserName}.png`);
	};
}

wdioConf.services = ['visual-regression', ...wdioConf.services];
wdioConf.visualRegression = {
	compare: new VisualRegressionCompare.LocalCompare({
		referenceName: getScreenshotName(path.join(process.cwd(), 'spec-e2e/visual-diffs/reference')),
		screenshotName: getScreenshotName(path.join(process.cwd(), 'spec-e2e/visual-diffs/current')),
		diffName: getScreenshotName(path.join(process.cwd(), 'spec-e2e/visual-diffs/diff')),
		misMatchTolerance: 0.05
	}),
	viewports: [{width: 1024, height: 768}],
};

exports.config = wdioConf;
