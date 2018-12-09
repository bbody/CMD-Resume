var helper = require('./support/helper.js');

describe("PDF", function() {
	beforeEach(function(){
		browser.url('/');

		helper.loadSimpleCMDResume(browser);

		$('body.full-screen-terminal').waitForExist(5000);
	});

	it("returns pdf", function(){
		var beforeOpenTabs = browser.getTabIds().length;
		helper.keyboard.typeCommand(browser, 'pdf');

		expect(beforeOpenTabs + 1).toBe(browser.getTabIds().length);
	});
});