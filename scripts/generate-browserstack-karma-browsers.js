var fs = require('fs');

var essentialBrowsers = process.argv[2] === "essential" ? true : false;

var getListOfVersions = function(start, end) {
	var versions = [];

	for (var i = end; i >= start; i--) {
		versions.push(`${i}.0`);
	}

	return versions;
};

var config = require("../browserstack/" + (essentialBrowsers ? 'bs-browsers-essential.config.json' : 'bs-browsers.config.json'));
var browserMap = {};
var browserList = [];
for (var os of config.operating_systems) {
	for (var browser of os.browsers) {
		if (browser.enabled) {
			if (!browser.versions){
				var oldestVersion = browser.oldest ? browser.oldest : browser.newest - 2;
				browser.versions = getListOfVersions(oldestVersion, browser.newest);
			}

			if (essentialBrowsers) {
				browser.versions = [browser.versions[0]];
			}

			for (var version of browser.versions) {
				var key = `bs__${os.name.replace(' ', '-')}_${os.version.replace(' ', '-')}__${browser.name}_${version}`;
				browserList.push(key);
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
}

var content = JSON.stringify(browserMap);

var customLaunchersFilename = essentialBrowsers ? 'bs-customLaunchers-essential.json' : 'bs-customLaunchers.json';
var browserListFilename = essentialBrowsers ? 'bs-browerList-essential.json' : 'bs-browerList.json';

fs.writeFile(`browserstack/${customLaunchersFilename}`, content, function(err, data){
	if (err) {
		console.error(err);
	}
	fs.writeFile(`browserstack/${browserListFilename}`, JSON.stringify({browsers: browserList}), function(err, data){
		if (err) {
			console.error(err);
		}
	});
});