var getArgumentList = function(argList) {
	console.log(argList);
	if (argList.length > 4) {
		return argList[4].split(',');
	} else {
		return [];
	}
};

var getCurrentOperatingSystem = function() {
	var os = require('os');
	if (os.platform().includes('mac') || os.platform().includes('darwin')) {
		return 'macos';
	} else if (os.platform().includes('win')) {
		return 'windows';
	} else {
		return 'linux';
	}
};

var getVersionString = function(package) {
	return `/* v${package.version} of CMD Resume by ${package.author.name} (${package.repository.url}) */\n`;
};

module.exports = {
	getArgumentList,
	getCurrentOperatingSystem,
	getVersionString
};
