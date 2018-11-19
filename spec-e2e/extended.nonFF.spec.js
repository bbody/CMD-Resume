var helper = require('./support/helper.js');

describe("Name", function() {
	beforeEach(function(){
		browser.url('/');

		helper.loadExtendedCMDResume(browser);

		$('body.terminal').waitForExist(5000);
	});

	it("returns pgpkey", function(){
		helper.keyboard.typeCommand(browser, 'pgpkey');

		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toBe("PGP Key");
		expect(commandOutput.values.length).toBeGreaterThan(1);
	});

	it("returns pgpkey", function(){
		helper.keyboard.typeCommand(browser, 'splash');
		
		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.values.length).toBeGreaterThan(5);
	});
});