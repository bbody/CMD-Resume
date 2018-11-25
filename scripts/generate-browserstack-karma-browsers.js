var fs = require('fs');

var getListOfVersions = function(start, end) {
	var versions = [];

	for (var i = end; i >= start; i--) {
		versions.push(`${i}`);
	}

	return versions;
};

var config = require('../browserstack/bs-browsers.config.json');
var browserMap = {};
var browserList = [];
var essentialBrowserList = [];

for (var os of config.operating_systems) {
	for (var browser of os.browsers) {
		if (!browser.versions){
			var oldestVersion = browser.oldest ? browser.oldest : browser.newest - 2;
			browser.versions = getListOfVersions(oldestVersion, browser.newest);
		}

		var latestVersion = browser.versions[0];

		for (var version of browser.versions) {
			if (!browser.enabled) {
				continue;
			}

			var key = `bs__${os.name.replace(' ', '-')}_${os.version.replace(' ', '-')}__${browser.name}_${version}`;
			browserList.push(key);

			// If it is essential and the latest version add to essential list
			if (browser.essential && latestVersion == version) {
				essentialBrowserList.push(key);
			}
			
			browserMap[key] = {
				"base": "BrowserStack",
				"browser": browser.name,
				"browser_version": version,
				"os": os.name,
				"os_version": os.version
			}
		}
	}
}

var content = JSON.stringify(browserMap);


fs.writeFile('browserstack/bs-customLaunchers.json', content, function(err, data){
	if (err) {
		console.error(err);
	}
});

fs.writeFile(`browserstack/bs-browerList.json`, JSON.stringify({browsers: browserList}), function(err, data){
	if (err) {
		console.error(err);
	}
});

fs.writeFile(`browserstack/bs-browerList-essential.json`, JSON.stringify({browsers: essentialBrowserList}), function(err, data){
	if (err) {
		console.error(err);
	}
});