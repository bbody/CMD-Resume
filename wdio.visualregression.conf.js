let wdioConf = require("./wdio.conf.js").config;
var merge = require('deepmerge');
var path = require('path');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotName(basePath) {
    return function(context) {
        var type = context.type;
        var testName = context.test.title;
        var browserName = context.browser.name;
        var browserWidth = browserViewport.width;
        var browserHeight = browserViewport.height;

        return path.join(basePath, `${testName}_${type}_${browserName}_${browserWidth}x${browserHeight}.png`);
    };
}

wdioConf.services.push('visual-regression');

exports.config = merge(wdioConf, {
    visualRegression: {
        compare: new VisualRegressionCompare.LocalCompare({
            referenceName: getScreenshotName(path.join(process.cwd(), 'spec-e2e/visual-diffs/reference')),
            screenshotName: getScreenshotName(path.join(process.cwd(), 'spec-e2e/visual-diffs/current')),
            diffName: getScreenshotName(path.join(process.cwd(), 'spec-e2e/visual-diffs/diff')),
            misMatchTolerance: 0.01,
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
    }
});