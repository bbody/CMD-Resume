const {exec} = require('child_process');
const gulpTask = process.argv[2];
const files = process.argv.splice(3);

const command = `gulp ${gulpTask} --files ${files.join(',')}`;

exec(command, (err, stdout, stderr) => {
	console.log(stderr);
	console.log(stdout);

	if (err) {
		process.exit(1);
	}

	process.exit(0);
});
