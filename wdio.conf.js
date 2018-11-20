exports.config = {
    specs: [
        'spec-e2e/*.spec.js'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [],
    debug: false,
    execArgv: null,
    sync: true,
    logLevel: 'verbose', // Level of logging verbosity: silent | verbose | command | data | result | error
    coloredLogs: true,
    deprecationWarnings: true,
    bail: 0,
    screenshotPath: 'spec-e2e/screenshots'
    ,baseUrl: 'http://localhost:4567',
    waitforTimeout: 1000,

    reporters: ['dot'],
    reporterOptions: {
        outputDir: './'
    },

    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000,
        expectationResultHandler: function(passed, assertion) {
            // do something
        },
        grep: null,
        invertGrep: null
    },

    services: ['selenium-standalone', 'static-server'],
    staticServerFolders: [
        { mount: '/', path: './test_tmp' },
        { mount: '/node_modules', path: './node_modules' }
    ],
    staticServerPort: 4567,

    // Firefox workaround
    seleniumArgs: {drivers: Object.assign({}, require('selenium-standalone/lib/default-config').drivers, {firefox: {version: '0.23.0'}})},
    seleniumInstallArgs: {drivers: Object.assign({}, require('selenium-standalone/lib/default-config').drivers, {firefox: {version: '0.23.0'}})},

    onComplete: function(exitCode, config, capabilities) {
        process.exit(exitCode);
    },
};
