let wdioConf = require("./wdio.conf.js").config;
var merge = require('deepmerge');
var path = require('path');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotName(basePath) {
    return function(context) {
        var type = context.type;
        var testName = context.test.fullName.replace(/ /gi, '_');
        var browserVersion = parseInt(context.browser.version, 10);
        var browserName = context.browser.name;

        return path.join(basePath, `${testName}__${browserName}.png`);
    };
}

wdioConf.services = ['visual-regression', ...wdioConf.services];
wdioConf.visualRegression = {
    compare: new VisualRegressionCompare.LocalCompare({
        referenceName: getScreenshotName(path.join(process.cwd(), 'spec-e2e/visual-diffs/reference')),
        screenshotName: getScreenshotName(path.join(process.cwd(), 'spec-e2e/visual-diffs/current')),
        diffName: getScreenshotName(path.join(process.cwd(), 'spec-e2e/visual-diffs/diff')),
        misMatchTolerance: 0.01,
    }),
    viewports: [{width: 1280, height: 800}],
};

exports.config = wdioConf;