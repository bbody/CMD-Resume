module.exports = {
	loadCMDResume: function() {
		console.log("HELLO");
		$('body').CMDResume('./responses/details.json', {'extraDetails': './responses/extra-details.json'});
	}
}