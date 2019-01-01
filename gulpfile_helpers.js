var getArgumentList = function(argList) {
	// https://www.sitepoint.com/pass-parameters-gulp-tasks/
	var arg = {}, a, opt, thisOpt, curOpt;
	for (a = 0; a < argList.length; a++) {

		thisOpt = argList[a].trim();
		opt = thisOpt.replace(/^\-+/, '');

		if (opt === thisOpt) {
			// argument value
			if (curOpt) {
				arg[curOpt] = opt;
			}
			curOpt = null;
		} else {
			// argument name
			curOpt = opt;
			arg[curOpt] = true;
		}

	}

	return arg;
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
