let exec = require('child_process').exec;

const release = releaseType => {
	const releaseTypes = ["major", "minor", "patch"];

	if (releaseTypes.includes(releaseType)){
		updateVersion(releaseType);
	} else {
		console.error("Invalid release type, use [major, minor, patch]")
	}
};

const updateVersion = type => {
	exec(`npm version ${type} --no-git-tag-version`, function (error, stout, sterr) {
		if (error){
			console.error(`npm version failed: ${error}`);
		} else {
			const releaseNumber = require('../package.json').version;
			setupGit(releaseNumber);
		}
	});
};

const setupGit = releaseNumber => {
	exec(`git reset && npm run release && git add package.json package-lock.json dist/* && git commit -m ":gem::bookmark: ${releaseNumber} release" && git tag -a ${releaseNumber} -m "Release ${releaseNumber}"`, function(error, stout, sterr){
		if (error){
			console.error(`git setup failed: ${error}`);
		} else {
			gitPush(releaseNumber);
		}
	});
};

const gitPush = releaseNumber => {
	exec(`git push origin master && git push origin ${releaseNumber}`, function(error, stout, sterr){
		if (error){
			console.error(`git push failed: ${error}`);
		} else {
			console.log(`Pushed release ${releaseNumber}`);
		}
	});
};

const releaseType = process.argv[2] ? process.argv[2].toLowerCase() : "";
release(releaseType);