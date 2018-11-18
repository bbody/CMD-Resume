var helper = require('./support/helper.js');

describe("Name", function() {
	beforeEach(function(){
		browser.url('/');

		browser.execute(function(){
			$('body').CMDResume('./responses/details.json');
		});

		$('body.terminal').waitForExist(5000);
	});

	it("returns name", function(){
		browser.keys("name\uE006");

		var commandOutput = helper.getSimpleValues(browser);

		expect(commandOutput.key).toBe("Name");
		expect(commandOutput.value).toBe("Richard Hendriks");
	});

	it("returns location", function(){
		browser.keys("location\uE006");

		var commandOutput = helper.getSimpleValues(browser);

		expect(commandOutput.key).toBe("Location");
		expect(commandOutput.value).toBe("San Francisco, California, US");
	});

	it("returns about", function(){
		browser.keys("about\uE006");

		var commandOutput = helper.getSimpleValues(browser);

		expect(commandOutput.key).toBe("About");
		expect(commandOutput.value).toContain("Richard hails from Tulsa.");
	});

	afterAll(function(){
		browser.end();
	});
});