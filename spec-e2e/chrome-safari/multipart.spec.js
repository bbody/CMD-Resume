var helper = require('./support/helper.js');

describe("multipart commans", function() {
	beforeEach(function(){
		browser.url('/');

		helper.loadSimpleCMDResume(browser);

		$('body.full-screen-terminal').waitForExist(5000);
	});

	it("handles a command", function(){
		helper.keyboard.typeCommand(browser, 'man man');

		var commandOutput = helper.getSingleValue(browser);

		expect(commandOutput).toContain("describes what each command does");
		expect(commandOutput).toContain("man");
	});

	it("handles invalid command", function(){
		helper.keyboard.typeCommand(browser, 'man dog');

		var commandOutput = helper.getSingleValue(browser);

		expect(commandOutput).toContain("dog is an unknown command");
		expect(commandOutput).toContain("dog");
	});
});