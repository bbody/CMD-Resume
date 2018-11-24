var fs = require('fs');

var getListOfVersions = function(start, end) {
	var versions = [];

	for (var i = start; i <= end; i++) {
		versions.push(`${i}.0`);
	}

	return versions;
};

var config = require('../bs-browsers.config.json');
var browserMap = {};
var browserList = [];
for (var os of config.operating_systems) {
	for (var browser of os.browsers) {
		if (browser.enabled) {
			if (!browser.versions){
				browser.versions = getListOfVersions(browser.oldest ? browser.oldest : browser.newest - 2, browser.newest);
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
fs.writeFile('bs-customLaunchers.json', content, function(err, data){
	if (err) {
		console.error(err);
	}
	fs.writeFile('bs-browerList.json', JSON.stringify({browsers: browserList}), function(err, data){
		if (err) {
			console.error(err);
		}
	});
});