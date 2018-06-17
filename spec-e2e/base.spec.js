var helper = require('./support/helper.js');

describe("Title", function() {
	beforeEach(function(){
		browser.url('/');
	});

	it("changes once plugin loads", function(){
		var title = browser.getTitle();
		expect(title).toBe("Command Line Résumé");
		browser.execute(function(){
			$('body').CMDResume('./responses/details.json');
		});
		browser.waitForExist('body.terminal');
		title = browser.getTitle();
		expect(title).toBe("Richard Hendriks's Résumé");
	});
});