var helper = require('./support/helper.js');

describe("Simple", function() {
	beforeEach(function(){
		browser.url('/');

		helper.loadSimpleCMDResume(browser);

		$('body.full-screen-terminal').waitForExist(5000);
	});

	it("returns name", function(){
		helper.keyboard.typeCommand(browser, 'name');

		var commandOutput = helper.getSimpleValues(browser);

		expect(commandOutput.key).toBe("Name");
		expect(commandOutput.value).toBe("Richard Hendriks");
	});

	it("returns location", function(){
		helper.keyboard.typeCommand(browser, 'location');

		var commandOutput = helper.getSimpleValues(browser);

		expect(commandOutput.key).toBe("Location");
		expect(commandOutput.value).toBe("San Francisco, California, US");
	});

	it("returns about", function(){
		helper.keyboard.typeCommand(browser, 'about');

		var commandOutput = helper.getSimpleValues(browser);

		expect(commandOutput.key).toBe("About");
		expect(commandOutput.value).toContain("Richard hails from Tulsa.");
	});

	it("handles invalid command", function(){
		helper.keyboard.typeCommand(browser, 'dog');

		var commandOutput = helper.getSingleValue(browser);

		expect(commandOutput).toContain("is an unknown command");
		expect(commandOutput).toContain("dog");
	});

	it("handles clear command", function(){
		helper.keyboard.typeCommand(browser, 'clear');

		expect($$('.terminal-output div').length).toBe(0);
	});

	it("handles no command", function(){
		helper.keyboard.typeCommand(browser, '');

		var commandOutput = helper.getSingleValue(browser);

		expect(commandOutput).toContain("No command entered");
	});


	it("handles tab completion", function(){
		helper.keyboard.typeCommand(browser, 'he', true);

		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toContain("Available Commands");
		expect(commandOutput.values.length).toBeGreaterThan(1);
	});

	describe("man", function(){
		beforeEach(function(){
			browser.url('/');

			helper.loadSimpleCMDResume(browser);

			$('body.full-screen-terminal').waitForExist(5000);
		});

		it("handles no command", function(){
			helper.keyboard.typeCommand(browser, 'man');

			var commandOutput = helper.getSingleValue(browser);

			expect(commandOutput).toBe("man: No command entered.");
		});
	});
});