let exec = require('child_process').exec;

exec(`git add ./CMD-RESUME-DATA-SCHEMA.md ./README.md ./CONTRIBUTING.md && git commit -m ":books: Compile documentation" && git push origin doc-build`, function(error, stout, sterr) {
	if (stout) {
		console.log(stout);
	}

	if (sterr) {
		console.error(sterr);
	}
});