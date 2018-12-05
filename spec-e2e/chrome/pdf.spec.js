var helper = require('./support/helper.js');

describe("PDF", function() {
	it("returns pdf", function(){
		var beforeOpenTabs = browser.getTabIds().length;
		var currentWindowHandle = browser.windowHandle();
		helper.keyboard.typeCommand(browser, 'pdf');

		// Only seems to work in Chrome
		browser.switchTab(currentWindowHandle);

		$('body.full-screen-terminal').waitForExist(5000);

		var commandOutput = helper.getSimpleValues(browser);

		expect(commandOutput.key).toBe("Résumé PDF");
		expect(commandOutput.value).toBe("http://en.wikipedia.org/wiki/R%C3%A9sum%C3%A9");
		expect(beforeOpenTabs + 1).toBe(browser.getTabIds().length);
	});
});