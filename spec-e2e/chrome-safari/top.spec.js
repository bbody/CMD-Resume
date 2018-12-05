var helper = require('./support/helper.js');

describe("top", function() {
	beforeEach(function(){
		browser.url('/');

		helper.loadSimpleCMDResume(browser);

		$('body.full-screen-terminal').waitForExist(5000);
	});
	it("returns education", function(){
		helper.keyboard.typeCommand(browser, 'education -top');
		
		var commandOutput = helper.getSingleValue(browser);

		expect(commandOutput).toContain("University");
	});

	it("returns education", function(){
		helper.keyboard.typeCommand(browser, 'employment -top');
		
		var commandOutput = helper.getSingleValue(browser);

		expect(commandOutput).toContain("CEO");
	});

	it("returns volunteering", function(){
		helper.keyboard.typeCommand(browser, 'volunteering -top');
		
		var commandOutput = helper.getSingleValue(browser);

		expect(commandOutput).toContain("Teacher");
	});

	it("returns awards", function(){
		helper.keyboard.typeCommand(browser, 'awards -top');
		
		var commandOutput = helper.getSingleValue(browser);

		expect(commandOutput).toContain("Award");
	});

	it("returns publications", function(){
		helper.keyboard.typeCommand(browser, 'publications -top');
		
		var commandOutput = helper.getSingleValue(browser);

		expect(commandOutput).toContain("for");
	});

	it("returns languages", function(){
		helper.keyboard.typeCommand(browser, 'languages -top');
		
		var commandOutput = helper.getSingleValue(browser);

		expect(commandOutput).toContain("English");
	});

	it("returns interests", function(){
		helper.keyboard.typeCommand(browser, 'interests -top');
		
		var commandOutput = helper.getSingleValue(browser);

		expect(commandOutput).toContain("Unicorns");
	});

	it("returns references", function(){
		helper.keyboard.typeCommand(browser, 'references -top');
		
		var commandOutput = helper.getSingleValue(browser);

		expect(commandOutput).toContain("Erlich");
	});
});