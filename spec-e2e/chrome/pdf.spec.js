var helper = require('./support/helper.js');

describe("Simple", function() {
	beforeEach(function(){
		browser.url('/');

		helper.loadSimpleCMDResume(browser);

		$('body.full-screen-terminal').waitForExist(5000);
	});

	it("returns pdf", function(){
		var beforeOpenTabs = browser.getTabIds().length;
		var currentWindowHandle = browser.windowHandle();
		helper.keyboard.typeCommand(browser, 'pdf');

		browser.switchTab(currentWindowHandle);

		browser.timeoutsImplicitWait(1000);

		var commandOutput = helper.getSimpleValues(browser);

		expect(commandOutput.key).toBe("Résumé PDF");
		expect(commandOutput.value).toBe("http://en.wikipedia.org/wiki/R%C3%A9sum%C3%A9");
		expect(beforeOpenTabs + 1).toBe(browser.getTabIds().length);
	});
});