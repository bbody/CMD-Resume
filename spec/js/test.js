var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};
webdriverio
    .remote(options)
    .init()
    .url('http://localhost:8000')
    .getTitle().then(function(title) {
        console.log('Title was: ' + title);
    })
    .end();